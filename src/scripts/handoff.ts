import { navigate, type TransitionBeforePreparationEvent } from 'astro:transitions/client';
import { serveOnce, takePreloaded } from './preload';
import type { WindowControls } from './window-controls';

let pending = false;
let folding: Promise<void> | undefined;

document.addEventListener('astro:before-preparation', (event) => {
  const transition = event as TransitionBeforePreparationEvent;
  const hold = folding;
  folding = undefined;

  const target = transition.to;
  const load = transition.loader;

  transition.loader = async () => {
    const page = await takePreloaded(target);
    const release = page ? serveOnce(target.href, page) : undefined;

    try {
      await Promise.all([load(), hold]);
    } finally {
      release?.();
    }

    if (page && transition.to.href === target.href && page.finalUrl !== target.href) {
      transition.to = new URL(page.finalUrl);
    }
  };
});
export function consumeHandoff(): boolean {
  const value = pending;
  pending = false;
  return value;
}

export function hideIncomingWindow(): void {
  if (!pending) return;
  document.querySelector<HTMLElement>('[data-window]')?.style.setProperty('opacity', '0');
}

export function initHandoff(signal: AbortSignal, controls: WindowControls | undefined): void {
  let leaving = false;

  for (const link of document.querySelectorAll<HTMLAnchorElement>('.dock-item[data-page]')) {
    link.addEventListener(
      'click',
      (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (link.getAttribute('aria-current') === 'page' || leaving) return;

        event.preventDefault();
        leaving = true;
        pending = true;
        folding = controls?.isOpen() ? controls.fold() : undefined;
        void navigate(link.href);
      },
      { signal }
    );
  }
}