import { TIMEZONE } from '../config';

const REFRESH_MS = 15_000;

export function initClock(signal: AbortSignal): void {
  const clocks = document.querySelectorAll<HTMLElement>('[data-clock]');
  if (clocks.length === 0) return;

  const format = new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, hour: 'numeric', minute: '2-digit' });

  const tick = (): void => {
    const now = new Date();
    for (const clock of clocks) {
      clock.textContent = format.format(now);
      clock.dateTime = now.toISOString();
    }
  };

  tick();
  const timer = window.setInterval(tick, REFRESH_MS);
  signal.addEventListener('abort', () => window.clearInterval(timer));
}
