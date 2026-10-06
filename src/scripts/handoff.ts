import { prefetch } from 'astro:prefetch';
import { navigate } from 'astro:transitions/client';
import type { WindowControls } from './window-controls';

let pending = false;

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
      async (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (link.getAttribute('aria-current') === 'page' || leaving) return;

        event.preventDefault();
        leaving = true;
        pending = true;
        prefetch(link.href, { ignoreSlowConnection: true });
        if (controls?.isOpen()) await controls.fold();
        void navigate(link.href);
      },
      { signal }
    );
  }
}