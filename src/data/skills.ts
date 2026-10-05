import { GITHUB_URL } from '../config';

export type SkillTier = 'strong' | 'great' | 'weakest';

export interface Skill {
  name: string;
  tier: SkillTier;
  href?: string;
}

const githubLanguage = (language: string) => `${GITHUB_URL}?tab=repositories&language=${language}`;

export const skills: Skill[] = [
  { name: 'Full-Stack Development', tier: 'strong' },
  { name: 'System Design', tier: 'strong' },
  { name: 'API Design', tier: 'strong' },
  { name: 'Database Design', tier: 'strong' },
  { name: 'Node.js', tier: 'great', href: githubLanguage('javascript') },
  { name: 'Nest.js', tier: 'great', href: githubLanguage('typescript') },
  { name: 'Svelte', tier: 'great', href: githubLanguage('svelte') },
  { name: 'React Native', tier: 'great', href: githubLanguage('javascript') },
  { name: 'AWS / GCP', tier: 'great' },
  { name: 'JavaScript / Typescript', tier: 'weakest', href: githubLanguage('typescript') },
  { name: 'PHP / Hack', tier: 'weakest', href: 'https://hacklang.org/' },
  { name: 'GraphQL', tier: 'weakest', href: 'https://graphql.org/' },
  { name: 'Python', tier: 'weakest', href: githubLanguage('python') },
  { name: 'Rust', tier: 'weakest', href: githubLanguage('rust') },
  { name: 'React', tier: 'weakest', href: githubLanguage('javascript') },
  { name: 'SQL', tier: 'weakest' },
];
