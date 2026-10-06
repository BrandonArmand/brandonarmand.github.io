export function initProjects(signal: AbortSignal): void {
  const rows = document.querySelectorAll<HTMLButtonElement>('.project-row');
  const previews = document.querySelectorAll<HTMLElement>('.project-preview');
  const status = document.getElementById('selected-project');
  if (rows.length === 0) return;

  const select = (id: string): void => {
    for (const row of rows) row.setAttribute('aria-pressed', String(row.dataset.project === id));
    for (const preview of previews) {
      const active = preview.dataset.preview === id;
      preview.hidden = !active;
      if (active && status) status.textContent = `${preview.dataset.title} selected`;
    }
  };

  for (const row of rows) {
    row.addEventListener('click', () => select(row.dataset.project ?? ''), { signal });
  }
}