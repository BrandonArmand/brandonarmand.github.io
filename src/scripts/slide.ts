const COLLAPSED = {
  height: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  borderTopWidth: '0px',
  borderBottomWidth: '0px',
  marginTop: '0px',
  marginBottom: '0px',
};

type Frame = typeof COLLAPSED;

function currentFrame(element: HTMLElement): Frame {
  const style = getComputedStyle(element);
  return {
    height: `${element.getBoundingClientRect().height}px`,
    paddingTop: style.paddingTop,
    paddingBottom: style.paddingBottom,
    borderTopWidth: style.borderTopWidth,
    borderBottomWidth: style.borderBottomWidth,
    marginTop: style.marginTop,
    marginBottom: style.marginBottom,
  };
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

async function animate(element: HTMLElement, from: Frame, to: Frame, duration: number, settle: () => void): Promise<void> {
  const previousOverflow = element.style.overflow;
  element.style.overflow = 'hidden';

  const animation = element.animate([from, to], {
    duration: prefersReducedMotion() ? 0 : duration,
    easing: 'ease',
    fill: 'both',
  });

  await animation.finished;
  settle();
  animation.cancel();
  element.style.overflow = previousOverflow;
}

export async function slideUp(element: HTMLElement, duration: number): Promise<void> {
  if (element.hidden) return;
  await animate(element, currentFrame(element), COLLAPSED, duration, () => {
    element.hidden = true;
  });
}

export async function slideDown(element: HTMLElement, duration: number): Promise<void> {
  if (!element.hidden) return;
  element.hidden = false;
  await animate(element, COLLAPSED, currentFrame(element), duration, () => {});
}

export async function transitionsSettled(element: HTMLElement): Promise<void> {
  void element.offsetWidth;
  await Promise.all(element.getAnimations().map((animation) => animation.finished.catch(() => undefined)));
}
