const START_DELAY_MS = 450;
const STEP_MS = 42;

let played = false;

export function playNameSwipe(): void {
  if (played) return;
  played = true;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const letters = [...document.querySelectorAll<HTMLElement>('#name .ch')];
  if (letters.length === 0) return;

  letters.forEach((letter, index) => {
    window.setTimeout(() => letter.classList.add('lit'), START_DELAY_MS + index * STEP_MS);
    window.setTimeout(() => letter.classList.remove('lit'), START_DELAY_MS + (index + 1) * STEP_MS);
  });
}