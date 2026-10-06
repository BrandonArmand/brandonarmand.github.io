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
    initWindowControls();
    initTerminal(signal);
  }
}

document.addEventListener('astro:page-load', start);
