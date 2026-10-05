import { ROUTES } from '../config';
import { initTerminal } from './terminal';
import { initWindowControls } from './window-controls';

if (window.location.hash === '#projects') {
  window.location.replace(ROUTES.projects);
}

initWindowControls();
initTerminal();
