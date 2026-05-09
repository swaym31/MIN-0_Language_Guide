/* MIN-0 site — shared JS */

/* ── Active nav link ─────────────────────────────── */
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path || (path === '' && a.getAttribute('href') === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── Textbook: sidebar highlight on scroll ──────── */
if (document.querySelector('.tb-sidebar')) {
  const headings = document.querySelectorAll('[data-anchor]');
  const links    = document.querySelectorAll('.tb-sidebar a[href^="#"]');
  const sidebar  = document.querySelector('.tb-sidebar');

  // On mobile the observer causes page-level scroll jumps (WebKit quirk) —
  // the strip still works fine as tap-navigation, just without auto-highlight.
  const isDesktop = () => window.innerWidth > 900;

  // Flag: temporarily pause the observer when the user clicks a link,
  // so mid-scroll observer fires don't hijack the destination.
  let navigating = false;
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (!isDesktop()) return;
      navigating = true;
      clearTimeout(link._navTimer);
      link._navTimer = setTimeout(() => { navigating = false; }, 900);
    });
  });

  const observer = new IntersectionObserver(entries => {
    // Skip entirely on mobile, or while a click-navigation is in progress
    if (!isDesktop() || navigating) return;

    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const id   = e.target.getAttribute('data-anchor');
        const link = document.querySelector(`.tb-sidebar a[href="#${id}"]`);
        if (link) {
          link.classList.add('active');
          // Scroll only within the sidebar panel, never the whole page
          const linkTop   = link.offsetTop;
          const sidebarH  = sidebar.clientHeight;
          const scrollTop = sidebar.scrollTop;
          if (linkTop < scrollTop + 40 || linkTop > scrollTop + sidebarH - 40) {
            sidebar.scrollTo({ top: linkTop - sidebarH / 2, behavior: 'smooth' });
          }
        }
      }
    });
  }, { rootMargin: '-60px 0px -70% 0px' });

  headings.forEach(h => observer.observe(h));
}

/* ── Dictionary: search + tabs + alpha nav ──────── */
if (document.querySelector('.dict-body')) {
  const searchInput = document.getElementById('dict-search');
  const tabBtns     = document.querySelectorAll('.tab-btn');
  const alphaBtns   = document.querySelectorAll('.alpha-btn');
  const countEl     = document.getElementById('entry-count');
  const noResults   = document.getElementById('no-results');

  let activeTab = 'verbs';

  function getEntries(tab) {
    return document.querySelectorAll(`.${tab}-section .dict-entry`);
  }
  function getSections(tab) {
    return document.querySelectorAll(`.${tab}-section .letter-section`);
  }

  function applyFilter() {
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();

    document.querySelectorAll('.dict-panel').forEach(p => {
      p.style.display = p.dataset.tab === activeTab ? '' : 'none';
    });

    const entries = getEntries(activeTab);
    let visible = 0;

    entries.forEach(e => {
      const word  = e.dataset.word || '';
      const code  = e.dataset.code || '';
      const match = !q || word.includes(q) || code.includes(q);
      e.classList.toggle('hidden', !match);
      if (match) visible++;
    });

    getSections(activeTab).forEach(sec => {
      const any = [...sec.querySelectorAll('.dict-entry')].some(e => !e.classList.contains('hidden'));
      sec.style.display = any ? '' : 'none';
    });

    if (countEl)   countEl.textContent     = `${visible} entries`;
    if (noResults) noResults.style.display = visible === 0 ? '' : 'none';
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.toggle('active', b === btn));
      if (searchInput) searchInput.value = '';
      applyFilter();
    });
  });

  if (searchInput) searchInput.addEventListener('input', applyFilter);

  alphaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('no-entries')) return;
      const letter = btn.dataset.letter;
      const target = document.getElementById(`${activeTab}-${letter}`);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  applyFilter();
}
