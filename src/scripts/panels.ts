import { requireElement, restartAnimation } from './dom';

export interface Panels {
  showAbout: () => void;
  showProjects: () => void;
}

export function initPanels(): Panels {
  const scroller = requireElement('home');
  const about = requireElement('about');
  const projects = requireElement('projects');
  const toolbar = requireElement('toolbar');
  const terminal = requireElement('console');
  const stack = requireElement('stack');

  function showProjects(): void {
    about.hidden = true;
    projects.hidden = false;
    restartAnimation(projects, 'fade-in');
    scroller.scrollTo({ top: 0 });
  }

  function showAbout(): void {
    projects.hidden = true;
    about.hidden = false;
    stack.innerHTML = '';
    terminal.hidden = false;
    toolbar.hidden = false;
    toolbar.classList.remove('minimized');
    restartAnimation(about, 'fade-in');
    scroller.scrollTo({ top: 0 });
  }

  function closeTerminal(): void {
    terminal.hidden = true;
    toolbar.hidden = true;
    stack.innerHTML = '';
  }

  function minimizeTerminal(): void {
    terminal.hidden = true;
    toolbar.classList.add('minimized');
  }

  function restoreTerminal(): void {
    toolbar.classList.remove('minimized');
    terminal.hidden = false;
  }

  function bindLink(element: Element | null, handler: () => void): void {
    element?.addEventListener('click', (event) => {
      event.preventDefault();
      handler();
    });
  }

  bindLink(document.getElementById('nav-about'), showAbout);
  bindLink(document.getElementById('nav-projects'), showProjects);
  bindLink(document.querySelector('[data-goto="projects"]'), showProjects);

  toolbar.querySelector('.red')?.addEventListener('click', closeTerminal);
  toolbar.querySelector('.yellow')?.addEventListener('click', minimizeTerminal);
  toolbar.querySelector('.green')?.addEventListener('click', restoreTerminal);

  return { showAbout, showProjects };
}
