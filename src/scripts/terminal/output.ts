export interface Output {
  print: (html: string) => void;
  clear: () => void;
  appendWelcome: () => void;
  scrollToBottom: () => void;
}

export function createOutput(consoleElement: HTMLElement, stack: HTMLElement, welcome: HTMLElement): Output {
  return {
    print: (html) => stack.insertAdjacentHTML('beforeend', html),

    clear() {
      stack.innerHTML = '';
    },

    appendWelcome() {
      const copy = welcome.cloneNode(true) as HTMLElement;
      copy.removeAttribute('id');
      copy.querySelectorAll('.delay-init').forEach((element) => element.classList.remove('delay-init'));
      stack.append(copy);
    },

    scrollToBottom() {
      consoleElement.scrollTo({ top: consoleElement.scrollHeight, behavior: 'smooth' });
    },
  };
}
