import { ROUTES } from '../config';
import { hopText } from './hop-text';

const PAGE_NAMES: Record<string, string> = {
  [ROUTES.home]: 'about',
  [ROUTES.projects]: 'projects',
  [ROUTES.history]: 'history',
};

const normalize = (path: string): string => path.replace(/\/$/, '') || ROUTES.home;

export function syncChrome(): void {
  const path = normalize(window.location.pathname);

  for (const link of document.querySelectorAll<HTMLAnchorElement>('.dock-item[data-page]')) {
    const isCurrent = normalize(new URL(link.href).pathname) === path;
    if (isCurrent) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }

  const pill = document.querySelector<HTMLElement>('.status-bar .pill-mono');
  const name = PAGE_NAMES[path] ?? path.replace(/^\//, '');
  if (pill) hopText(pill, name);
}