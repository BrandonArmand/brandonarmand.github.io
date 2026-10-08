export const MOBILE_QUERY = '(max-width: 1199px)';

const DEFAULT_RATIO = 0.6;

export function isMobile(): boolean {
  return window.matchMedia(MOBILE_QUERY).matches;
}

export function whenInView(element: Element, signal: AbortSignal, onVisible: () => void, ratio = DEFAULT_RATIO): void {
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.intersectionRatio >= ratio)) return;
      observer.disconnect();
      onVisible();
    },
    { threshold: ratio }
  );

  observer.observe(element);
  signal.addEventListener('abort', () => observer.disconnect());
}