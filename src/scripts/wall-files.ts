import { ROUTES } from '../config';

export function initWallFiles(): void {
  const active = window.location.pathname.replace(/\/$/, '') === '' || window.location.pathname === ROUTES.home;
  for (const button of document.querySelectorAll<HTMLButtonElement>('.wall-file')) {
    button.disabled = !active;
  }
}