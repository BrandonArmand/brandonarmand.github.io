import { requireElement } from './dom';

export function initWindowControls(): void {
  const toolbar = requireElement('toolbar');
  const terminal = requireElement('console');
  const stack = requireElement('stack');

  function close(): void {
    terminal.hidden = true;
    toolbar.hidden = true;
    stack.innerHTML = '';
  }

  function minimize(): void {
    terminal.hidden = true;
    toolbar.classList.add('minimized');
  }

  function restore(): void {
    toolbar.classList.remove('minimized');
    terminal.hidden = false;
  }

  toolbar.querySelector('.red')?.addEventListener('click', close);
  toolbar.querySelector('.yellow')?.addEventListener('click', minimize);
  toolbar.querySelector('.green')?.addEventListener('click', restore);
}
