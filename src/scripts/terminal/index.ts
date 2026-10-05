import { requireElement } from '../dom';
import { createCommands } from './commands';
import { INTRO_DELAY_MS, MAX_TYPE_WAIT_MS, PROMPT_ARROW, TYPE_DELAY_MS } from './content';
import { createHistory } from './history';
import { button, echoedCommand, escapeHtml, line } from './html';
import { bindKeyboard } from './keyboard';
import { createOutput } from './output';
import { createPrompt } from './prompt';

export function initTerminal(): void {
  const terminal = requireElement('console');
  const welcome = requireElement('welcome');
  const introPrompt = requireElement('init-input');

  const output = createOutput(terminal, requireElement('stack'), welcome);
  const prompt = createPrompt(requireElement('input'), requireElement('autofill-suggestion'));
  const history = createHistory();
  const commands = createCommands({ output, historyEntries: history.entries });

  let typingTimer: number | undefined;
  const cancelTyping = () => window.clearInterval(typingTimer);

  function run(): void {
    const raw = prompt.value;
    const trimmed = raw.trim();

    prompt.clear();
    history.reset();
    if (trimmed) history.push(trimmed);

    output.print(echoedCommand(raw));

    if (trimmed) {
      const [name, ...args] = trimmed.split(/\s+/);
      const command = Object.hasOwn(commands, name) ? commands[name] : undefined;
      if (command) command(args);
      else output.print(line(`${escapeHtml(trimmed)}: command not found. Try ${button('help', 'help')}`));
    }

    output.scrollToBottom();
  }

  function typeCommand(command: string): void {
    cancelTyping();
    prompt.clear();

    let index = 0;
    typingTimer = window.setInterval(() => {
      prompt.append(command[index++]);
      if (index < command.length) return;

      cancelTyping();
      window.setTimeout(run, Math.min(command.length * TYPE_DELAY_MS, MAX_TYPE_WAIT_MS));
    }, TYPE_DELAY_MS);
  }

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const command = event.target.closest<HTMLElement>('[data-cmd]')?.dataset.cmd;
    if (!command) return;

    output.scrollToBottom();
    typeCommand(command);
  });

  bindKeyboard({
    terminal,
    prompt,
    history,
    run,
    onInput: cancelTyping,
    onTyped: output.scrollToBottom,
  });

  window.setTimeout(() => {
    introPrompt.innerHTML = PROMPT_ARROW;
  }, INTRO_DELAY_MS);
}
