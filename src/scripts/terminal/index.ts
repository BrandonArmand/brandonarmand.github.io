import { requireElement } from '../dom';
import { createCommands } from './commands';
import { MAX_TYPE_WAIT_MS, TYPE_DELAY_MS } from './content';
import { createHistory } from './history';
import { button, echoedCommand, escapeHtml, line } from './html';
import { bindKeyboard } from './keyboard';
import { createOutput } from './output';
import { createPrompt } from './prompt';

let introPlayed = false;

const INTRO_COMMAND = 'node welcome.js';
const INTRO_START_MS = 750;
const INTRO_RUN_PAUSE_MS = 280;

export function initTerminal(signal: AbortSignal, ensureOpen: () => Promise<void>, onIntroDone: () => void): void {
  const terminal = requireElement('console');
  const welcome = requireElement('welcome');

  const output = createOutput(terminal, requireElement('stack'), welcome);
  const prompt = createPrompt(requireElement('input'), requireElement('autofill-suggestion'));
  const history = createHistory();
  const commands = createCommands({ output, historyEntries: history.entries });

  let typingTimer: number | undefined;
  let runTimer: number | undefined;
  const cancelTyping = () => {
    window.clearInterval(typingTimer);
    window.clearTimeout(runTimer);
  };

  function execute(raw: string): void {
    const trimmed = raw.trim();

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

  function run(): void {
    const raw = prompt.value;
    prompt.clear();
    execute(raw);
  }

  function typeCommand(
    command: string,
    pause = Math.min(command.length * TYPE_DELAY_MS, MAX_TYPE_WAIT_MS),
    after?: () => void
  ): void {
    cancelTyping();
    prompt.clear();

    let index = 0;
    typingTimer = window.setInterval(() => {
      prompt.append(command[index++]);
      if (index < command.length) return;

      cancelTyping();
      runTimer = window.setTimeout(() => {
        run();
        after?.();
      }, pause);
    }, TYPE_DELAY_MS);
  }

  let introTimer: number | undefined;
  let introPending = false;

  function finishIntro(): void {
    if (!introPending) return;
    introPending = false;
    onIntroDone();
  }

  function skipIntro(): void {
    if (!introPending) return;
    window.clearTimeout(introTimer);
    cancelTyping();
    prompt.clear();
    execute(INTRO_COMMAND);
    finishIntro();
  }

  document.addEventListener(
    'click',
    async (event) => {
      if (!(event.target instanceof Element)) return;
      const command = event.target.closest<HTMLElement>('[data-cmd]')?.dataset.cmd;
      if (!command) return;

      await ensureOpen();
      skipIntro();
      output.scrollToBottom();
      typeCommand(command);
    },
    { signal }
  );

  bindKeyboard({
    terminal,
    prompt,
    history,
    run,
    onInput: () => {
      cancelTyping();
      skipIntro();
    },
    onTyped: output.scrollToBottom,
    signal,
  });

  terminal.closest('[data-window]')?.addEventListener('window-closed', output.clear, { signal });

  const seen = introPlayed;
  introPlayed = true;

  if (seen) {
    terminal.classList.add('seen');
    execute(INTRO_COMMAND);
    onIntroDone();
  } else {
    introPending = true;
    introTimer = window.setTimeout(() => typeCommand(INTRO_COMMAND, INTRO_RUN_PAUSE_MS, finishIntro), INTRO_START_MS);
  }

  signal.addEventListener('abort', () => {
    cancelTyping();
    window.clearTimeout(introTimer);
  });
}
