import { navigate } from 'astro:transitions/client';
import { ROUTES } from '../config';
import { initClock } from './clock';
import { initScreens } from './screens';
import { initTerminal } from './terminal';
import { initWindowControls } from './window-controls';

let session: AbortController | undefined;

function start(): void {
  session?.abort();
  session = undefined;

  if (window.location.hash === '#projects') {
    void navigate(ROUTES.projects, { history: 'replace' });
    return;
  }

  session = new AbortController();
  const { signal } = session;

  initScreens(signal);
  initClock(signal);

  if (document.getElementById('console')) {
    const controls = initWindowControls(signal);
    initTerminal(signal, controls.ensureOpen);
  }
}

document.addEventListener('astro:after-swap', () => {
  try {
    if (sessionStorage.getItem('intro')) document.getElementById('console')?.classList.add('seen');
  } catch {}
});

document.addEventListener('astro:page-load', start);
