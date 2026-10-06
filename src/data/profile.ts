export interface Tag {
  name: string;
  dot: string;
}

export const worksWith: Tag[] = [
  { name: 'Python', dot: '#ffd43b' },
  { name: 'TypeScript', dot: '#3178c6' },
  { name: 'GoLang', dot: '#00add8' },
];

export const exploring: Tag[] = [
  { name: 'Rust', dot: '#dea584' },
  { name: 'Godot', dot: '#478cbf' },
];

export const commandChips = ['help', 'ls', 'cd projects', 'node hire-me.js'];

export const wallFiles = [
  { name: 'welcome.js', color: '#ffd43b' },
  { name: 'beep.boop.js', color: '#f2918d' },
  { name: 'hire-me.js', color: '#b0e6b8' },
];