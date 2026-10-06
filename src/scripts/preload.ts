interface Page {
  text: string;
  finalUrl: string;
}

interface Entry {
  page: Promise<Page>;
  loadedAt: number;
}

const STALE_MS = 3 * 60 * 1000;
const entries = new Map<string, Entry>();

const keyOf = (url: URL | string): string => {
  const parsed = new URL(url, window.location.href);
  return parsed.origin + (parsed.pathname.replace(/\/$/, '') || '/');
};

const isFresh = (entry: Entry): boolean => Date.now() - entry.loadedAt < STALE_MS;

async function fetchPage(href: string): Promise<Page> {
  const response = await fetch(href);
  const type = response.headers.get('content-type') ?? '';
  if (!response.ok || !type.includes('text/html')) throw new Error(`Cannot preload ${href}`);
  return { text: await response.text(), finalUrl: response.url };
}

export function preloadPages(hrefs: string[]): void {
  for (const href of hrefs) {
    const key = keyOf(href);
    const existing = entries.get(key);
    if (existing && isFresh(existing)) continue;

    const page = fetchPage(href);
    entries.set(key, { page, loadedAt: Date.now() });
    page.catch(() => {
      if (entries.get(key)?.page === page) entries.delete(key);
    });
  }
}

export function preloadDockPages(): void {
  const hrefs = [...document.querySelectorAll<HTMLAnchorElement>('.dock-item[data-page]')]
    .filter((link) => link.getAttribute('aria-current') !== 'page')
    .map((link) => link.href);

  window.setTimeout(() => preloadPages(hrefs), 300);
}

export async function takePreloaded(url: URL | string): Promise<Page | undefined> {
  const entry = entries.get(keyOf(url));
  if (!entry || !isFresh(entry)) return undefined;
  return entry.page.catch(() => undefined);
}

export function serveOnce(href: string, page: Page): () => void {
  const target = new URL(href, window.location.href).href;
  const original = window.fetch;

  window.fetch = (input, init) => {
    const url = new URL(input instanceof Request ? input.url : String(input), window.location.href).href;
    if (url !== target) return original(input, init);

    window.fetch = original;
    return Promise.resolve(new Response(page.text, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } }));
  };

  return () => {
    if (window.fetch !== original) window.fetch = original;
  };
}