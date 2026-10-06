import { ROUTES } from '../config';

const PAGE_NAMES: Record<string, string> = {
  [ROUTES.home]: 'about',
  [ROUTES.projects]: 'projects',
  [ROUTES.history]: 'history',
};

const FADE_OUT_MS = 70;
const FADE_IN_MS = 90;

const normalize = (path: string): string => path.replace(/\/$/, '') || ROUTES.home;

function swapText(element: HTMLElement, text: string): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.textContent = text;
    return;
  }

  const fadeOut = element.animate([{ opacity: 1 }, { opacity: 0 }], { duration: FADE_OUT_MS, fill: 'forwards' });
  fadeOut.finished.then(() => {
    element.textContent = text;
    fadeOut.cancel();
    element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: FADE_IN_MS });
  });
}

export function syncChrome(): void {
  const path = normalize(window.location.pathname);

  for (const link of document.querySelectorAll<HTMLAnchorElement>('.dock-item[data-page]')) {
    const isCurrent = normalize(new URL(link.href).pathname) === path;
    if (isCurrent) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }

  const pill = document.querySelector<HTMLElement>('.status-bar .pill-mono');
  const name = PAGE_NAMES[path] ?? path.replace(/^\//, '');
  if (pill && pill.textContent !== name) swapText(pill, name);
}