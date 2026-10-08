const CORNERS = ['tl', 'tr', 'bl', 'br'] as const;

let observer: ResizeObserver | undefined;
let observed: Element | undefined;

function tagCorners(list: HTMLElement): void {
  const items = [...list.children] as HTMLElement[];
  if (items.length === 0) return;

  for (const item of items) item.classList.remove(...CORNERS.map((corner) => `corner-${corner}`));

  const topRow = items.filter((item) => item.offsetTop === items[0].offsetTop);
  const bottomTop = items[items.length - 1].offsetTop;
  const bottomRow = items.filter((item) => item.offsetTop === bottomTop);

  topRow[0].classList.add('corner-tl');
  topRow[topRow.length - 1].classList.add('corner-tr');
  bottomRow[0].classList.add('corner-bl');
  bottomRow[bottomRow.length - 1].classList.add('corner-br');
}

export function initSkillCorners(): void {
  const list = document.getElementById('skills');
  if (!list || list === observed) return;

  observer?.disconnect();
  observed = list;
  observer = new ResizeObserver(() => tagCorners(list));
  observer.observe(list);
  void document.fonts.ready.then(() => tagCorners(list));
  tagCorners(list);
}