import { navigate } from 'astro:transitions/client';
import { EMAIL, MAILTO, ROUTES } from '../../config';
import { HELP_ENTRIES } from './content';
import {
  button,
  dirList,
  escapeHtml,
  face,
  fileList,
  helpEntry,
  historyItem,
  historyKeysHelp,
  line,
} from './html';
import type { Output } from './output';

export type Command = (args: string[]) => void;

export interface CommandContext {
  output: Output;
  historyEntries: () => readonly string[];
}

export function createCommands({ output, historyEntries }: CommandContext): Record<string, Command> {
  const { print, clear, appendWelcome } = output;

  function printNodeUsage(): void {
    print(line(`Usage: ${button('node', 'node [file]')}`));
    print(line('Script not found. Choose one below.'));
    print(fileList());
  }

  function printCdUsage(): void {
    print(line(`Usage: ${button('cd', 'cd [directory]')}`));
    print(line('Directory not found. Choose one below.'));
    print(dirList());
  }

  return {
    node([file]) {
      switch (file) {
        case 'welcome.js':
          appendWelcome();
          break;
        case 'beep.boop.js':
          print(face());
          break;
        case 'hire-me.js':
          print(line(`Reach out to me via email: <a class="email" href="${MAILTO}">${EMAIL}</a>`));
          print(line('Let me know you got this prompt! 😎'));
          break;
        default:
          printNodeUsage();
      }
    },

    ls() {
      print(dirList());
      print(fileList());
    },

    cd([dir]) {
      switch (dir) {
        case undefined:
          printCdUsage();
          break;
        case 'projects':
          void navigate(ROUTES.projects);
          break;
        case 'about':
          print(line("You're already here!"));
          break;
        case 'contact':
          window.location.href = MAILTO;
          break;
        default:
          print(line(`${escapeHtml(dir)} not found`));
      }
    },

    help() {
      print(line('<span class="text-highlight">Tab completion</span> is available for commands, files, and directories.', 'hint'));
      print(historyKeysHelp());
      HELP_ENTRIES.forEach((entry) => print(helpEntry(entry)));
    },

    history() {
      historyEntries().forEach((entry) => print(historyItem(entry)));
    },

    why() {
      print(line('<span class="text-highlight text-orange">Why</span> have I built this terminal?'));
      print(
        line(
          'I honest to God have <span class="text-highlight loud-text text-white">no idea</span> why. ' +
            'It has been fun to build, and it has since been rebuilt from the ancient jQuery original into TypeScript.'
        )
      );
      print(line('The complexity of its functionality is impressive though!'));
      print(face());
    },

    clear,
    cls: clear,
  };
}
