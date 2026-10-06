import { GITHUB_OWNER } from '../config';

export interface RepoStats {
  forks: number;
  stars: number;
  contributors: number;
}

const TIMEOUT_MS = 6000;
const API = 'https://api.github.com';

function requestInit(): RequestInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'brandonarmand-site',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
}

async function countContributors(repo: string): Promise<number | undefined> {
  const response = await fetch(`${API}/repos/${GITHUB_OWNER}/${repo}/contributors?per_page=1`, requestInit());
  if (!response.ok) return undefined;

  const last = response.headers.get('link')?.match(/[?&]page=(\d+)>; rel="last"/);
  if (last) return Number(last[1]);

  const list: unknown = await response.json();
  return Array.isArray(list) ? list.length : undefined;
}

export async function fetchRepoStats(repo: string): Promise<Partial<RepoStats>> {
  try {
    const [details, contributors] = await Promise.all([
      fetch(`${API}/repos/${GITHUB_OWNER}/${repo}`, requestInit()),
      countContributors(repo),
    ]);
    if (!details.ok) return { contributors };

    const data = (await details.json()) as { forks_count?: number; stargazers_count?: number };
    return { forks: data.forks_count, stars: data.stargazers_count, contributors };
  } catch {
    return {};
  }
}