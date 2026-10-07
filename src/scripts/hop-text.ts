const STEP_MS = 36;
const HOP_MS = 340;
const APEX = 0.45;
const RISE = '-0.6em';

interface HopState {
  timers: number[];
  animations: Animation[];
  target: string;
}

const states = new WeakMap<HTMLElement, HopState>();

function cancel(state: HopState): void {
  state.timers.forEach((timer) => window.clearTimeout(timer));
  state.animations.forEach((animation) => animation.cancel());
}

export function hopText(element: HTMLElement, text: string): void {
  const previous = states.get(element);
  if (previous?.target === text) return;
  if (previous) cancel(previous);

  const from = previous ? previous.target : (element.textContent ?? '');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || from === text) {
    element.textContent = text;
    states.set(element, { timers: [], animations: [], target: text });
    return;
  }

  const length = Math.max(from.length, text.length);
  const state: HopState = { timers: [], animations: [], target: text };
  states.set(element, state);

  element.textContent = '';
  const slots = Array.from({ length }, (_, index) => {
    const slot = document.createElement('span');
    slot.className = 'hop-ch';
    slot.textContent = from[index] ?? '';
    element.append(slot);
    return slot;
  });

  slots.forEach((slot, index) => {
    const delay = index * STEP_MS;
    const next = text[index] ?? '';

    state.animations.push(
      slot.animate(
        [
          { transform: 'translateY(0) scale(1)' },
          { transform: `translateY(${RISE}) scale(1.3)`, offset: APEX },
          { transform: 'translateY(0) scale(1)' },
        ],
        { duration: HOP_MS, delay, easing: 'ease-in-out', fill: 'backwards' }
      )
    );

    state.timers.push(
      window.setTimeout(() => {
        slot.textContent = next;
      }, delay + HOP_MS * APEX)
    );
  });

  state.timers.push(
    window.setTimeout(() => {
      element.textContent = text;
    }, (length - 1) * STEP_MS + HOP_MS + 20)
  );
}