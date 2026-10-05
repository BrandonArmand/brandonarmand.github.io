import { initPanels } from './panels';
import { initTerminal } from './terminal';

const { showProjects } = initPanels();
initTerminal({ showProjects });

if (window.location.hash === '#projects') showProjects();
