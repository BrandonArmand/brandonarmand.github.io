import binariBanner from '../assets/binari.png';
import markItOff from '../assets/mark-it-off.png';
import portfolio from '../assets/portfolio.png';
import taskApi from '../assets/task-api.jpeg';
import textToSpeech from '../assets/text-to-speech.jpeg';
import { GITHUB_URL } from '../config';

export type StatKey = 'forks' | 'contributors' | 'stars';

export interface ProjectStat {
  key: StatKey;
  icon: string;
  value: number;
  label: string;
}

export type ProjectLabel = 'Featured' | 'Active' | 'Archived';

export interface Project {
  id: string;
  repo?: string;
  title: string;
  year: number;
  labels: ProjectLabel[];
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  image: ImageMetadata;
  imageAlt: string;
  description?: string;
  stats?: ProjectStat[];
}

export const STAT_ICONS = {
  forks:
    '<circle cx="12" cy="18" r="2"/><circle cx="7" cy="6" r="2"/><circle cx="17" cy="6" r="2"/><path d="M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8M12 12v4"/>',
  contributors:
    '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85"/>',
  stars: '<path d="M12 17.75l-6.172 3.245 1.179-6.873-5-4.867 6.9-1 3.086-6.253 3.086 6.253 6.9 1-5 4.867 1.179 6.873z"/>',
};

export const projects: Project[] = [
  {
    id: 'binari',
    repo: 'Binari',
    title: 'Binari',
    year: 2019,
    labels: ['Featured', 'Archived'],
    stack: ['JavaScript', 'SCSS'],
    repoUrl: `${GITHUB_URL}/Binari`,
    liveUrl: 'https://binari.dev',
    image: binariBanner,
    imageAlt: 'Binari code editor beside a live binary tree',
    description:
      'Interactive code editor with a live binary tree visual designed to teach new developers the fundamentals of data structures.',
    stats: [
      { key: 'forks', icon: STAT_ICONS.forks, value: 106, label: 'forks' },
      { key: 'contributors', icon: STAT_ICONS.contributors, value: 26, label: 'contributors' },
      { key: 'stars', icon: STAT_ICONS.stars, value: 179, label: 'stars' },
    ],
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    year: 2017,
    labels: ['Active'],
    stack: ['TypeScript', 'Astro'],
    repoUrl: `${GITHUB_URL}/brandonarmand.github.io`,
    liveUrl: 'https://brandonarmand.com',
    image: portfolio,
    imageAlt: 'This portfolio: a desktop-style site with a terminal window and a dock',
    description:
      'A desktop-style portfolio built with Astro and TypeScript, with a working terminal, a dock for navigation, and windows that fold into it.',
  },
  {
    id: 'mark-it-off',
    title: 'Mark it Off',
    year: 2017,
    labels: ['Archived'],
    stack: ['Ruby on Rails'],
    repoUrl: `${GITHUB_URL}/to-do-list`,
    image: markItOff,
    imageAlt: 'Mark it Off to-do list app',
    description:
      'Do you procrastinate? Do you occasionally forget the most basic responsibilities? Mark-it-Off is for you (if I maintained it)! This application is meant to organize your to-do lists by forcing you to complete each task within seven days of creation.',
  },
  {
    id: 'text-to-speech',
    title: 'Text-to-Speech-to-Text CLI',
    year: 2018,
    labels: ['Archived'],
    stack: ['Python'],
    repoUrl: `${GITHUB_URL}/Text-to-Speech-to-Text#text-to-speech-with-python`,
    image: textToSpeech,
    imageAlt: 'Text-to-Speech-to-Text command line tool',
    description:
      'An occasionally maintained side project that includes many different folders containing speech-recognition, text-to-speech, and speech-to-text packages.',
  },
  {
    id: 'task-api',
    title: 'Task-Management API',
    year: 2017,
    labels: ['Archived'],
    stack: ['Ruby on Rails'],
    repoUrl: `${GITHUB_URL}/To-do-API#task-managmenet-api`,
    image: taskApi,
    imageAlt: 'Task-Management API',
    description:
      'An API for task creation, and organization.',
  },
];