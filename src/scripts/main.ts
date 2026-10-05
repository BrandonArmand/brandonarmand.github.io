import { navigate } from 'astro:transitions/client';
import { ROUTES } from '../config';
import { initTerminal } from './terminal';
import { initWindowControls } from './window-controls';

let session: AbortController | undefined;

function start(): void {
  session?.abort();
  session = undefined;

  if (!document.getElementById('console')) return;

  if (window.location.hash === '#projects') {
    void navigate(ROUTES.projects, { history: 'replace' });
    return;
  }

  session = new AbortController();
  initWindowControls();
  initTerminal(session.signal);
}

document.addEventListener('astro:page-load', start);
