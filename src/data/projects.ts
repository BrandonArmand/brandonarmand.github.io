import binariBanner from '../assets/binari.png';
import markItOff from '../assets/mark-it-off.png';
import taskApi from '../assets/task-api.jpeg';
import textToSpeech from '../assets/text-to-speech.jpeg';
import { GITHUB_URL } from '../config';

export interface ProjectStat {
  icon: string;
  value: number;
  label: string;
}

export interface FeaturedProject {
  title: string;
  repoUrl: string;
  siteUrl: string;
  banner: ImageMetadata;
  description: string;
  stats: ProjectStat[];
}

export interface ArchivedProject {
  title: string;
  tech: string;
  href: string;
  image: ImageMetadata;
}

export const featuredProject: FeaturedProject = {
  title: 'BINARI.DEV',
  repoUrl: `${GITHUB_URL}/Binari`,
  siteUrl: 'https://binari.dev',
  banner: binariBanner,
  description:
    'Interactive code editor with a live binary tree visual designed to teach new developers the fundamentals of data structures. ~120 - ~150 Monthly visitors.',
  stats: [
    { icon: 'fa-code-fork', value: 106, label: 'FORKS' },
    { icon: 'fa-users', value: 26, label: 'CONTRIBUTORS' },
    { icon: 'fa-star', value: 179, label: 'STARS' },
  ],
};

export const archivedProjects: ArchivedProject[] = [
  {
    title: 'Mark it Off',
    tech: 'Ruby on Rails',
    href: `${GITHUB_URL}/to-do-list`,
    image: markItOff,
  },
  {
    title: 'Text-to-Speech-to-Text CLI',
    tech: 'Python',
    href: `${GITHUB_URL}/Text-to-Speech-to-Text#text-to-speech-with-python`,
    image: textToSpeech,
  },
  {
    title: 'Task-Management API',
    tech: 'Ruby on Rails',
    href: `${GITHUB_URL}/To-do-API#task-managmenet-api`,
    image: taskApi,
  },
];
