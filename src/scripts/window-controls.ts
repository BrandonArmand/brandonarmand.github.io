import { ROUTES } from '../config';
import { requireElement } from './dom';

type WindowState = 'open' | 'minimized' | 'closed';

export interface WindowControls {
  ensureOpen: () => Promise<void>;
}

const MINIMIZE_MS = 520;
const RESTORE_MS = 460;
const CLOSE_MS = 180;
const REDUCED_MS = 120;
const TILE_SQUASH_MS = 260;

const FULL = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
const PINCH = 'polygon(0 0, 100% 0, 74% 100%, 26% 100%)';
const FUNNEL = 'polygon(8% 0, 92% 0, 58% 100%, 42% 100%)';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function findTile(): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.dock-item[href="${ROUTES.home}"] .dock-tile`);
}

function offsetToTile(windowElement: HTMLElement, tile: HTMLElement): { dx: number; dy: number } {
  const from = windowElement.getBoundingClientRect();
  const to = tile.getBoundingClientRect();
  return {
    dx: to.left + to.width / 2 - (from.left + from.width / 2),
    dy: to.top + to.height / 2 - (from.top + from.height / 2),
  };
}

function minimizeFrames(dx: number, dy: number): Keyframe[] {
  return [
    { offset: 0, opacity: 1, transform: 'translate(0, 0) scale(1, 1)', clipPath: FULL },
    { offset: 0.16, opacity: 1, transform: 'translate(0, -5px) scale(0.97, 1.07)', clipPath: FULL },
    { offset: 0.42, opacity: 1, transform: `translate(${dx * 0.3}px, ${dy * 0.3}px) scale(0.74, 0.7)`, clipPath: PINCH },
    { offset: 0.78, opacity: 1, transform: `translate(${dx * 0.88}px, ${dy * 0.88}px) scale(0.3, 0.52)`, clipPath: FUNNEL },
    { offset: 1, opacity: 0, transform: `translate(${dx}px, ${dy}px) scale(0.08)`, clipPath: FUNNEL },
  ];
}

function restoreFrames(dx: number, dy: number): Keyframe[] {
  return [
    { offset: 0, opacity: 0, transform: `translate(${dx}px, ${dy}px) scale(0.08)`, clipPath: FUNNEL },
    { offset: 0.22, opacity: 1, transform: `translate(${dx * 0.88}px, ${dy * 0.88}px) scale(0.3, 0.52)`, clipPath: FUNNEL },
    { offset: 0.58, opacity: 1, transform: `translate(${dx * 0.3}px, ${dy * 0.3}px) scale(0.74, 0.7)`, clipPath: PINCH },
    { offset: 0.84, opacity: 1, transform: 'translate(0, -4px) scale(1.02, 1.03)', clipPath: FULL },
    { offset: 1, opacity: 1, transform: 'translate(0, 0) scale(1, 1)', clipPath: FULL },
  ];
}

const fadeFrames = (from: number, to: number): Keyframe[] => [{ opacity: from }, { opacity: to }];

async function play(element: HTMLElement, keyframes: Keyframe[], duration: number, reduced: Keyframe[]): Promise<void> {
  const reducedMotion = prefersReducedMotion();
  const animation = element.animate(reducedMotion ? reduced : keyframes, {
    duration: reducedMotion ? REDUCED_MS : duration,
    easing: 'ease-in-out',
    fill: 'both',
  });
  await animation.finished;
  animation.cancel();
}

function squashTile(tile: HTMLElement | null, delay: number): void {
  if (!tile || prefersReducedMotion()) return;
  tile.animate(
    [{ transform: 'none' }, { transform: 'scale(1.22, 0.76)', transformOrigin: 'bottom center', offset: 0.4 }, { transform: 'none' }],
    { duration: TILE_SQUASH_MS, delay, easing: 'ease-out', composite: 'add' }
  );
}

export function initWindowControls(signal: AbortSignal): WindowControls {
  const windowElement = requireElement('term-window');
  const toolbar = requireElement('toolbar');
  const stack = requireElement('stack');

  let state: WindowState = 'open';
  let busy = false;

  async function minimize(): Promise<void> {
    const tile = findTile();
    const { dx, dy } = tile ? offsetToTile(windowElement, tile) : { dx: 0, dy: 160 };
    squashTile(tile, MINIMIZE_MS - 120);
    await play(windowElement, minimizeFrames(dx, dy), MINIMIZE_MS, fadeFrames(1, 0));
    windowElement.hidden = true;
    state = 'minimized';
  }

  async function close(): Promise<void> {
    await play(
      windowElement,
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.9)' },
      ],
      CLOSE_MS,
      fadeFrames(1, 0)
    );
    windowElement.hidden = true;
    stack.innerHTML = '';
    state = 'closed';
  }

  async function restore(): Promise<void> {
    const tile = findTile();
    windowElement.hidden = false;
    windowElement.classList.remove('zoomed');
    const { dx, dy } = tile ? offsetToTile(windowElement, tile) : { dx: 0, dy: 160 };
    squashTile(tile, 0);
    await play(windowElement, restoreFrames(dx, dy), RESTORE_MS, fadeFrames(0, 1));
    state = 'open';
  }

  function exclusive(action: () => Promise<void>): () => Promise<void> {
    return async () => {
      if (busy) return;
      busy = true;
      try {
        await action();
      } finally {
        busy = false;
      }
    };
  }

  const onMinimize = exclusive(async () => {
    if (state === 'open') await minimize();
  });

  const onClose = exclusive(async () => {
    if (state === 'open') await close();
  });

  const onRestore = exclusive(async () => {
    if (state !== 'open') await restore();
  });

  toolbar.querySelector('.yellow')?.addEventListener('click', onMinimize, { signal });
  toolbar.querySelector('.red')?.addEventListener('click', onClose, { signal });
  toolbar.querySelector('.green')?.addEventListener('click', () => windowElement.classList.toggle('zoomed'), { signal });

  findTile()
    ?.closest('a')
    ?.addEventListener(
      'click',
      (event) => {
        if (state === 'open') return;
        event.preventDefault();
        event.stopPropagation();
        void onRestore();
      },
      { signal, capture: true }
    );

  return {
    async ensureOpen() {
      while (busy) await new Promise((resolve) => window.setTimeout(resolve, 40));
      await onRestore();
    },
  };
}
