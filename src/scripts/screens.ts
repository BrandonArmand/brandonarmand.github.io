import { ROUTES } from '../config';

const MOBILE_QUERY = '(max-width: 1199px)';

let hasLoaded = false;

export function initScreens(signal: AbortSignal): void {
  const row = document.querySelector<HTMLElement>('.row');
  const dots = document.querySelectorAll<HTMLElement>('.screen-dots span');
  const firstVisit = !hasLoaded;
  hasLoaded = true;

  if (!row || !window.matchMedia(MOBILE_QUERY).matches) return;

  if (!firstVisit || window.location.pathname !== ROUTES.home) {
    row.scrollTop = row.clientHeight;
  }

  const sync = (): void => {
    const onContent = row.scrollTop > row.clientHeight / 2;
    dots[0]?.classList.toggle('active', !onContent);
    dots[1]?.classList.toggle('active', onContent);
  };

  sync();
  row.addEventListener('scroll', sync, { passive: true, signal });
}
