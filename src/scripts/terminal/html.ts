import { FACE_HTML } from '../../data/face';
import { DIRS, FILES, PROMPT_ARROW, type HelpEntry } from './content';

const ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => ENTITIES[char]);
}

export const button = (command: string, label: string) =>
  `<span class="code-snippet" data-cmd="${escapeHtml(command)}">${label}</span>`;

export const line = (html: string, className = '') =>
  `<h5 class="my-info${className ? ` ${className}` : ''}">${html}</h5>`;

export const face = () => `<span class="my-info face">${FACE_HTML}</span>`;

export const echoedCommand = (raw: string) =>
  `<h3 class="commands display-4">${PROMPT_ARROW} ${escapeHtml(raw)}</h3>`;

export const dirList = () =>
  DIRS.map(
    (dir) =>
      `<span class="code-snippet indented" data-cmd="cd ${dir.name}"><h5 class="text-highlight ${dir.colorClass}">${dir.name}</h5>/</span><br />`
  ).join('');

export const fileList = () =>
  FILES.map(
    (file) =>
      `<span class="code-snippet indented" data-cmd="node ${file}"><h5 class="text-highlight">${file}</h5></span><br />`
  ).join('');

export const historyItem = (entry: string) =>
  `<p class="code-snippet indented" data-cmd="${escapeHtml(entry)}">${escapeHtml(entry)}</p><br />`;

export const helpEntry = ({ commands, description }: HelpEntry) =>
  line(
    `${commands.map(({ command, label }) => button(command, label)).join(' / ')}<br /><span class="help-desc">${description}</span>`
  );

export const historyKeysHelp = () =>
  '<h5 class="code-snippet indented"><span class="fa-solid fa-caret-up text-white"></span></h5> / ' +
  '<h5 class="code-snippet"><span class="fa-solid fa-caret-down text-white"></span></h5><br />' +
  line('<span class="help-desc">Navigate up and down through the command history.</span>');
