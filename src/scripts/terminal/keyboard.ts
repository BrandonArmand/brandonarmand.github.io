import type { History } from './history';
import type { Prompt } from './prompt';

interface KeyboardOptions {
  terminal: HTMLElement;
  prompt: Prompt;
  history: History;
  run: () => void;
  onInput: () => void;
  onTyped: () => void;
  signal: AbortSignal;
}

const FORM_FIELDS = 'input, textarea, select, [contenteditable]';

export function bindKeyboard({ terminal, prompt, history, run, onInput, onTyped, signal }: KeyboardOptions): void {
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (terminal.offsetParent === null) return;
    if (event.target instanceof Element && event.target.closest(FORM_FIELDS)) return;

    onInput();

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        run();
        return;
      case 'Backspace':
        event.preventDefault();
        history.reset();
        prompt.backspace();
        return;
      case 'Tab':
        event.preventDefault();
        prompt.acceptSuggestion();
        return;
      case 'ArrowUp': {
        event.preventDefault();
        const previous = history.previous();
        if (previous !== undefined) prompt.set(previous);
        return;
      }
      case 'ArrowDown': {
        event.preventDefault();
        const next = history.next();
        if (next !== undefined) prompt.set(next);
        return;
      }
    }

    if (event.key.length === 1 && !prompt.isFull) {
      event.preventDefault();
      history.reset();
      prompt.append(event.key);
      onTyped();
    }
  }, { signal });
}
