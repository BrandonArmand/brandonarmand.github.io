import { requireElement } from './dom';
import { slideDown, slideUp, transitionsSettled } from './slide';

const CLOSE_CONSOLE_MS = 270;
const CLOSE_TOOLBAR_MS = 100;
const MINIMIZE_CONSOLE_MS = 500;
const RESTORE_CONSOLE_MS = 400;

export function initWindowControls(): void {
  const toolbar = requireElement('toolbar');
  const terminal = requireElement('console');
  const stack = requireElement('stack');

  let busy = false;

  function exclusive(action: () => Promise<void>): () => void {
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

  const close = exclusive(async () => {
    await slideUp(terminal, CLOSE_CONSOLE_MS);
    await slideUp(toolbar, CLOSE_TOOLBAR_MS);
    stack.innerHTML = '';
  });

  const minimize = exclusive(async () => {
    await slideUp(terminal, MINIMIZE_CONSOLE_MS);
    toolbar.classList.add('minimized');
    await transitionsSettled(toolbar);
  });

  const restore = exclusive(async () => {
    toolbar.classList.remove('minimized');
    await transitionsSettled(toolbar);
    await slideDown(terminal, RESTORE_CONSOLE_MS);
  });

  toolbar.querySelector('.red')?.addEventListener('click', close);
  toolbar.querySelector('.yellow')?.addEventListener('click', minimize);
  toolbar.querySelector('.green')?.addEventListener('click', restore);
}
