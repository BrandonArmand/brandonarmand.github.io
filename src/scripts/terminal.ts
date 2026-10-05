const EMAIL = 'contact@brandonarmand.com';
const PROMPT_COLOR = '#74b2c7';

const FACE =
  '<span class="my-info" style="white-space: nowrap">' +
  '<span style="color: #bedbf3">â””</span>[âˆµ<span style="color: #bedbf3">â”Œ</span>]' +
  '<span style="color: #b0e6b8">â””</span>[ âˆµ ]<span style="color: #b0e6b8">â”˜</span>' +
  '[<span style="color: orange">â”</span>âˆµ]<span style="color: orange">â”˜</span></span>';

const DIRS = [
  { name: 'projects', color: 'orange' },
  { name: 'about', color: '#bedbf3' },
  { name: 'contact', color: '#b0e6b8' },
];
const FILES = ['welcome.js', 'beep.boop.js', 'hire-me.js'];

const COMMAND_NAMES = ['node', 'ls', 'cd', 'help', 'history', 'why', 'clear', 'cls'];
const ARGUMENT_SUGGESTIONS = [
  ...FILES.map((file) => `node ${file}`),
  ...DIRS.map((dir) => `cd ${dir.name}`),
];

const TYPE_DELAY_MS = 70;
const MAX_INPUT_LENGTH = 200;

interface TerminalOptions {
    showProjects: () => void;
}

function requireElement<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing #${id}`);
  return el as T;
}

function escapeHtml(text: string): string {
  const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return text.replace(/[&<>"']/g, (char) => entities[char]);
}

const button = (cmd: string, label: string) =>
  `<span class="code-snippet" data-cmd="${escapeHtml(cmd)}">${label}</span>`;

const line = (html: string, style = '') => `<h5 class="my-info"${style ? ` style="${style}"` : ''}>${html}</h5>`;

const dirList = () =>
  DIRS.map(
    (dir) =>
      `<span class="code-snippet indented" data-cmd="cd ${dir.name}"><h5 class="text-highlight" style="color: ${dir.color}; margin: 0">${dir.name}</h5>/</span><br />`
  ).join('');

const fileList = () =>
  FILES.map(
    (file) =>
      `<span class="code-snippet indented" data-cmd="node ${file}"><h5 class="text-highlight" style="color: white; margin: 0">${file}</h5></span><br />`
  ).join('');

const helpEntry = (buttons: string, description: string) =>
  line(`${buttons}<br /><span class="help-desc">${description}</span>`);

export function initTerminal({ showProjects }: TerminalOptions): void {
  const consoleEl = requireElement('console');
  const stack = requireElement('stack');
  const inputEl = requireElement('input');
  const suggestionEl = requireElement('autofill-suggestion');
  const welcome = requireElement('welcome');
  const initInput = requireElement('init-input');

  let buffer = '';
  const history: string[] = [];
  let historyIndex = 0;
  let typingTimer: number | undefined;

  const print = (html: string) => stack.insertAdjacentHTML('beforeend', html);
  const clear = () => {
    stack.innerHTML = '';
  };
  const scrollToBottom = () => consoleEl.scrollTo({ top: consoleEl.scrollHeight, behavior: 'smooth' });

  function updateSuggestion(): void {
    suggestionEl.textContent = '';
    if (!buffer) return;
    const matchingCommands = COMMAND_NAMES.filter((name) => name.startsWith(buffer));
    const pool =
      matchingCommands.length === 1
        ? matchingCommands
        : [...matchingCommands, ...ARGUMENT_SUGGESTIONS.filter((entry) => entry.startsWith(buffer))];
    if (pool.length === 1) suggestionEl.textContent = pool[0].slice(buffer.length);
  }

  function setBuffer(value: string): void {
    buffer = value;
    inputEl.textContent = buffer;
    updateSuggestion();
  }

  const nodeUsage = () => {
    print(line(`Usage: ${button('node', 'node [file]')}`));
    print(line('Script not found. Choose one below.'));
    print(fileList());
  };

  const commands: Record<string, (args: string[], raw: string) => void> = {
    node([file]) {
      switch (file) {
        case 'welcome.js': {
          const copy = welcome.cloneNode(true) as HTMLElement;
          copy.removeAttribute('id');
          copy.querySelectorAll('.delay-init').forEach((el) => el.classList.remove('delay-init'));
          stack.append(copy);
          break;
        }
        case 'beep.boop.js':
          print(FACE);
          break;
        case 'hire-me.js':
          print(line(`Reach out to me via email: <a class="email" href="mailto:${EMAIL}">${EMAIL}</a>`));
          print(line('Let me know you got this prompt! ðŸ˜Ž'));
          break;
        default:
          nodeUsage();
      }
    },

    ls() {
      print(dirList());
      print(fileList());
    },

    cd([dir]) {
      switch (dir) {
        case undefined:
          print(line(`Usage: ${button('cd', 'cd [directory]')}`));
          print(line('Directory not found. Choose one below.'));
          print(dirList());
          break;
        case 'projects':
          clear();
          showProjects();
          break;
        case 'about':
          print(line("You're already here!"));
          break;
        case 'contact':
          window.location.href = '/contact';
          break;
        default:
          print(line(`${escapeHtml(dir)} not found`));
      }
    },

    help() {
      print(line('<span class="text-highlight">Tab completion</span> is available for commands, files, and directories.', 'color: grey; font-size: 16px'));
      print(
        '<h5 class="code-snippet indented"><span class="fa-solid fa-caret-up" style="color: whitesmoke"></span></h5> / ' +
          '<h5 class="code-snippet" style="display: inline-flex"><span class="fa-solid fa-caret-down" style="color: whitesmoke"></span></h5><br />' +
          line('<span class="help-desc">Navigate up and down through the command history.</span>')
      );
      print(helpEntry(button('ls', 'ls'), 'Search nearby paths (pages).'));
      print(helpEntry(button('cd', 'cd [directory]'), 'Navigate to directory (webpage).'));
      print(helpEntry(button('node', 'node [file]'), 'Run (fake) .js script.'));
      print(helpEntry(`${button('cls', 'cls')} / ${button('clear', 'clear')}`, 'Clear terminal.'));
      print(helpEntry(button('help', 'help'), 'This.'));
      print(helpEntry(button('history', 'history'), 'Show command history.'));
      print(helpEntry(button('why', 'why'), 'Why I built this terminal. ðŸ¤”'));
    },

    history() {
      for (const entry of history) {
        print(`<p class="code-snippet indented" data-cmd="${escapeHtml(entry)}">${escapeHtml(entry)}</p><br />`);
      }
    },

    why() {
      print(line('<span class="text-highlight" style="color: orange">Why</span> have I built this terminal?'));
      print(
        line(
          'I honest to God have <span class="text-highlight loud-text" style="color: whitesmoke">no idea</span> why. ' +
            'It has been fun to build, and it has since been rebuilt from the ancient jQuery original into TypeScript.'
        )
      );
      print(line("The complexity of its functionality is impressive though!"));
      print(FACE);
    },

    clear,
    cls: clear,
  };

  function run(): void {
    const raw = buffer;
    const trimmed = raw.trim();
    setBuffer('');
    historyIndex = 0;
    if (trimmed) history.push(trimmed);

    print(`<h3 class="commands display-4"><span style="color: ${PROMPT_COLOR}">&gt;</span> ${escapeHtml(raw)}</h3>`);

    if (trimmed) {
      const [name, ...args] = trimmed.split(/\s+/);
      const command = Object.hasOwn(commands, name) ? commands[name] : undefined;
      if (command) command(args, trimmed);
      else print(line(`${escapeHtml(trimmed)}: command not found. Try ${button('help', 'help')}`));
    }
    scrollToBottom();
  }

  function typeCommand(command: string): void {
    window.clearInterval(typingTimer);
    setBuffer('');
    let i = 0;
    typingTimer = window.setInterval(() => {
      setBuffer(buffer + command[i++]);
      if (i >= command.length) {
        window.clearInterval(typingTimer);
        window.setTimeout(run, Math.min(command.length * TYPE_DELAY_MS, 700));
      }
    }, TYPE_DELAY_MS);
  }

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest<HTMLElement>('[data-cmd]');
    if (!target?.dataset.cmd) return;
    scrollToBottom();
    typeCommand(target.dataset.cmd);
  });

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (consoleEl.offsetParent === null) return;
    if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable]')) return;

    window.clearInterval(typingTimer);

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        run();
        return;
      case 'Backspace':
        event.preventDefault();
        historyIndex = 0;
        setBuffer(buffer.slice(0, -1));
        return;
      case 'Tab':
        event.preventDefault();
        if (suggestionEl.textContent) setBuffer(buffer + suggestionEl.textContent);
        return;
      case 'ArrowUp':
        event.preventDefault();
        if (history.length) {
          historyIndex = Math.min(historyIndex + 1, history.length);
          setBuffer(history[history.length - historyIndex]);
        }
        return;
      case 'ArrowDown':
        event.preventDefault();
        if (history.length) {
          historyIndex = Math.max(historyIndex - 1, 0);
          setBuffer(historyIndex ? history[history.length - historyIndex] : '');
        }
        return;
    }
    if (event.key.length === 1 && buffer.length < MAX_INPUT_LENGTH) {
      event.preventDefault();
      historyIndex = 0;
      setBuffer(buffer + event.key);
      scrollToBottom();
    }
  });

  window.setTimeout(() => {
    initInput.innerHTML = `<span style="color: ${PROMPT_COLOR}">&gt;</span>`;
  }, 2700);
}
