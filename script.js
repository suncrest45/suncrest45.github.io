// Optional enhancement only. Navigation and project breakdowns work without JS.
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Project filter tabs. Without JS the tab bar stays hidden and all projects show.
const tabBar = document.querySelector('.filter-tabs');
if (tabBar) {
  const tabs = [...tabBar.querySelectorAll('.filter-tab')];
  const projects = [...document.querySelectorAll('#project-list [data-category]')];
  const grid = document.querySelector('.project-grid');
  const count = document.querySelector('#project-count');

  const applyFilter = (filter) => {
    let visible = 0;
    projects.forEach((p) => {
      const show = filter === 'all' || p.dataset.category.split(' ').includes(filter);
      p.hidden = !show;
      if (show) visible++;
    });

    if (grid) {
      const gridVisible = [...grid.children].filter((c) => !c.hidden).length;
      grid.hidden = gridVisible === 0;
      grid.classList.toggle('single', gridVisible === 1);
    }

    if (count) count.textContent = String(visible).padStart(2, '0');

    tabs.forEach((t) => {
      const active = t.dataset.filter === filter;
      t.setAttribute('aria-selected', active);
      t.tabIndex = active ? 0 : -1;
    });
  };

  tabBar.hidden = false;
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => applyFilter(t.dataset.filter));
    t.addEventListener('keydown', (e) => {
      const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      const next = tabs[(i + dir + tabs.length) % tabs.length];
      next.focus();
      applyFilter(next.dataset.filter);
    });
  });
  applyFilter('all');
}
