import { GITHUB_URL, LINKEDIN_URL, MAILTO, ROUTES } from '../config';

export interface DockItem {
  name: string;
  href: string;
  color: string;
  icon: string;
  external?: boolean;
}

const ICONS = {
  terminal: 'M4 17l6-6-6-6M12 19h8',
  folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  mail: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l9 6 9-6',
  linkedin: 'M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z',
  github:
    'M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
};

export const pages: DockItem[] = [
  { name: 'About', href: ROUTES.home, color: '#b0e6b8', icon: ICONS.terminal },
  { name: 'Projects', href: ROUTES.projects, color: '#bedbf3', icon: ICONS.folder },
  { name: 'Email', href: MAILTO, color: '#f2918d', icon: ICONS.mail },
];

export const links: DockItem[] = [
  { name: 'LinkedIn', href: LINKEDIN_URL, color: '#ffa500', icon: ICONS.linkedin, external: true },
  { name: 'GitHub', href: GITHUB_URL, color: '#f5f5f5', icon: ICONS.github, external: true },
];
