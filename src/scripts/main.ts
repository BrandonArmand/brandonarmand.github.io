import { navigate } from 'astro:transitions/client';
import { ROUTES } from '../config';
import { syncChrome } from './chrome-state';
import { initClock } from './clock';
import { isMobile, whenInView } from './in-view';
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

  const mobile = isMobile();
  const name = document.getElementById('name');

  if (document.getElementById('console') && controls) {
    initTerminal(signal, controls.ensureOpen, () => {
      if (!mobile) playNameSwipe(NAME_SWIPE_AFTER_INTRO_MS);
    });
  } else if (!mobile) playNameSwipe();

  if (mobile && name) whenInView(name, signal, () => playNameSwipe(NAME_SWIPE_AFTER_INTRO_MS));

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