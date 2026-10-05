export interface History {
  entries: () => readonly string[];
  push: (entry: string) => void;
  reset: () => void;
  previous: () => string | undefined;
  next: () => string | undefined;
}

export function createHistory(): History {
  const items: string[] = [];
  let position = 0;

  return {
    entries: () => items,

    push(entry) {
      items.push(entry);
    },

    reset() {
      position = 0;
    },

    previous() {
      if (!items.length) return undefined;
      position = Math.min(position + 1, items.length);
      return items[items.length - position];
    },

    next() {
      if (!items.length) return undefined;
      position = Math.max(position - 1, 0);
      return position ? items[items.length - position] : '';
    },
  };
}
