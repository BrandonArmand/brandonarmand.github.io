import { navigate, type TransitionBeforePreparationEvent } from 'astro:transitions/client';
import type { WindowControls } from './window-controls';

let pending = false;
let folding: Promise<void> | undefined;

document.addEventListener('astro:before-preparation', (event) => {
  const hold = folding;
  if (!hold) return;
  folding = undefined;

  const transition = event as TransitionBeforePreparationEvent;
  const load = transition.loader;
  transition.loader = async () => {
    await Promise.all([load(), hold]);
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