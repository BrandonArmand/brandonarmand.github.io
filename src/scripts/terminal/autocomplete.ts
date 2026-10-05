import { ARGUMENT_SUGGESTIONS, COMMAND_NAMES } from './content';

export function suggest(input: string): string {
  if (!input) return '';

  const matchingCommands = COMMAND_NAMES.filter((name) => name.startsWith(input));
  const candidates =
    matchingCommands.length === 1
      ? matchingCommands
      : [...matchingCommands, ...ARGUMENT_SUGGESTIONS.filter((entry) => entry.startsWith(input))];

  return candidates.length === 1 ? candidates[0].slice(input.length) : '';
}
