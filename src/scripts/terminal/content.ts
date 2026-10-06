export const TYPE_DELAY_MS = 70;
export const MAX_TYPE_WAIT_MS = 700;
export const MAX_INPUT_LENGTH = 200;

export const PROMPT_ARROW = '<span class="prompt-arrow">&gt;</span>';

export const DIRS = [
  { name: 'projects', colorClass: 'text-orange' },
  { name: 'about', colorClass: 'text-blue' },
  { name: 'contact', colorClass: 'text-green' },
];

export const FILES = ['welcome.js', 'beep.boop.js', 'hire-me.js'];

export const COMMAND_NAMES = ['node', 'ls', 'cd', 'help', 'history', 'why', 'clear', 'cls'];

export const ARGUMENT_SUGGESTIONS = [
  ...FILES.map((file) => `node ${file}`),
  ...DIRS.map((dir) => `cd ${dir.name}`),
];

export interface HelpEntry {
  commands: { command: string; label: string }[];
  description: string;
}

export const HELP_ENTRIES: HelpEntry[] = [
  { commands: [{ command: 'ls', label: 'ls' }], description: 'Search nearby paths (pages).' },
  { commands: [{ command: 'cd', label: 'cd [directory]' }], description: 'Navigate to directory (webpage).' },
  { commands: [{ command: 'node', label: 'node [file]' }], description: 'Run (fake) .js script.' },
  {
    commands: [
      { command: 'cls', label: 'cls' },
      { command: 'clear', label: 'clear' },
    ],
    description: 'Clear terminal.',
  },
  { commands: [{ command: 'help', label: 'help' }], description: 'This.' },
  { commands: [{ command: 'history', label: 'history' }], description: 'Show command history.' },
  { commands: [{ command: 'why', label: 'why' }], description: 'Why I built this terminal. 🤔' },
];
