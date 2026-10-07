import { navigate } from 'astro:transitions/client';
import { ROUTES } from '../config';
import { syncChrome } from './chrome-state';
import { initClock } from './clock';
import { playNameSwipe } from './name-swipe';
import { consumeHandoff, hideIncomingWindow, initHandoff } from './handoff';
import { preloadDockPages } from './preload';
import { initProjects } from './projects';
import { initScreens, snapToContent } from './screens';
import { initTerminal } from './terminal';
import { initWallFiles } from './wall-files';
import { initWindowControls } from './window-controls';

const NAME_SWIPE_AFTER_INTRO_MS = 150;

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

  syncChrome();
  initScreens(signal);
  initClock(signal);
  initWallFiles();

  const controls = initWindowControls(signal);
  initHandoff(signal, controls);
  initProjects(signal);
  preloadDockPages();

  if (document.getElementById('console') && controls) initTerminal(signal, controls.ensureOpen, () => playNameSwipe(NAME_SWIPE_AFTER_INTRO_MS));
  else playNameSwipe();

  if (consumeHandoff()) void controls?.unfold();
}

document.addEventListener('astro:after-swap', () => {
  void document.body.offsetHeight;
  syncChrome();
  initWallFiles();
  snapToContent();
  hideIncomingWindow();
});

document.addEventListener('astro:page-load', start);