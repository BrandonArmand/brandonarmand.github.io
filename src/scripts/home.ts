import { initTerminal } from './terminal';

function requireElement(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing #${id}`);
  return el;
}

const home = requireElement('home');
const about = requireElement('about');
const projects = requireElement('projects');
const toolbar = requireElement('toolbar');
const consoleEl = requireElement('console');
const stack = requireElement('stack');

function fadeIn(el: HTMLElement): void {
  el.classList.remove('fade-in');
  void el.offsetWidth;
  el.classList.add('fade-in');
}

function showProjects(): void {
  about.hidden = true;
  projects.hidden = false;
  fadeIn(projects);
  home.scrollTo({ top: 0 });
}

function showAbout(): void {
  projects.hidden = true;
  about.hidden = false;
  stack.innerHTML = '';
  consoleEl.hidden = false;
  toolbar.hidden = false;
  toolbar.classList.remove('minimized');
  fadeIn(about);
  home.scrollTo({ top: 0 });
}

document.getElementById('nav-about')?.addEventListener('click', (event) => {
  event.preventDefault();
  showAbout();
});
document.getElementById('nav-projects')?.addEventListener('click', (event) => {
  event.preventDefault();
  showProjects();
});
document.querySelector('[data-goto="projects"]')?.addEventListener('click', (event) => {
  event.preventDefault();
  showProjects();
});

toolbar.querySelector('.red')?.addEventListener('click', () => {
  consoleEl.hidden = true;
  toolbar.hidden = true;
  stack.innerHTML = '';
});
toolbar.querySelector('.yellow')?.addEventListener('click', () => {
  consoleEl.hidden = true;
  toolbar.classList.add('minimized');
});
toolbar.querySelector('.green')?.addEventListener('click', () => {
  toolbar.classList.remove('minimized');
  consoleEl.hidden = false;
});

initTerminal({ showProjects });

if (window.location.hash === '#projects') showProjects();
