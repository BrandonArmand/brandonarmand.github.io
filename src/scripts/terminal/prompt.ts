import { suggest } from './autocomplete';
import { MAX_INPUT_LENGTH } from './content';

export interface Prompt {
  readonly value: string;
  readonly isFull: boolean;
  set: (next: string) => void;
  append: (text: string) => void;
  backspace: () => void;
  clear: () => void;
  acceptSuggestion: () => void;
}

export function createPrompt(inputElement: HTMLElement, suggestionElement: HTMLElement): Prompt {
  let value = '';

  function set(next: string): void {
    value = next;
    inputElement.textContent = value;
    suggestionElement.textContent = suggest(value);
  }

  return {
    get value() {
      return value;
    },

    get isFull() {
      return value.length >= MAX_INPUT_LENGTH;
    },

    set,
    append: (text) => set(value + text),
    backspace: () => set(value.slice(0, -1)),
    clear: () => set(''),

    acceptSuggestion() {
      const suggestion = suggestionElement.textContent;
      if (suggestion) set(value + suggestion);
    },
  };
}
