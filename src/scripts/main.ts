/**
 * Client-side enhancements. The page is fully readable without this script;
 * each feature is a no-op if its markup is missing (e.g. on the 404 page).
 */

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------- Theme */

function initTheme() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  if (!toggle) return;
  const root = document.documentElement;

  const sync = () => {
    const isDark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('aria-pressed', String(isDark));
  };

  const apply = (theme: 'light' | 'dark') => {
    root.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
    sync();
  };

  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    if ('startViewTransition' in document && !prefersReducedMotion()) {
      document.startViewTransition(() => apply(next));
    } else {
      apply(next);
    }
  });

  // Follow OS changes until the visitor picks a theme explicitly.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('theme');
    } catch {
      /* ignore */
    }
    if (!stored) {
      root.dataset.theme = e.matches ? 'dark' : 'light';
      sync();
    }
  });

  sync();
}

/* -------------------------------------------------------- Header border */

function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const update = () => header.toggleAttribute('data-scrolled', window.scrollY > 4);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------------------------------------------- Active section tracking */

function initActiveSection() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
  if (!links.length) return;
  const ids = [...new Set(links.map((l) => l.dataset.navLink!))];
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);

  const setActive = (id: string | null) => {
    for (const link of links) {
      if (link.dataset.navLink === id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  };

  // A section is "active" while it crosses a line ~30% down the viewport.
  // The last section is short, so it also wins once the page is scrolled to the end.
  const visible = new Set<string>();
  const last = sections[sections.length - 1];
  const update = () => {
    const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const current = atEnd ? last : sections.find((s) => visible.has(s.id));
    setActive(current ? current.id : null);
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      update();
    },
    { rootMargin: '-30% 0px -69% 0px' },
  );
  sections.forEach((s) => observer.observe(s));
  window.addEventListener('scroll', update, { passive: true });
}

/* ---------------------------------------------------------- Mobile menu */

function initMobileMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const label = document.querySelector<HTMLElement>('[data-menu-label]');
  if (!toggle || !menu) return;

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  const open = () => {
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    if (label) label.textContent = 'Close menu';
    // Next frame, so the transition runs; skip if it was closed again meanwhile.
    requestAnimationFrame(() => {
      if (isOpen()) menu.setAttribute('data-open', '');
    });
  };

  const close = (restoreFocus = true) => {
    menu.removeAttribute('data-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (label) label.textContent = 'Open menu';
    const hide = () => {
      if (!menu.hasAttribute('data-open')) menu.hidden = true;
    };
    if (prefersReducedMotion()) hide();
    else window.setTimeout(hide, 240);
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => (isOpen() ? close() : open()));

  // Close after choosing a destination; the browser handles the anchor scroll.
  menu.querySelectorAll('[data-menu-link]').forEach((link) =>
    link.addEventListener('click', () => close(false)),
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close();
  });

  // Clicking outside the header closes the menu.
  document.addEventListener('click', (e) => {
    if (isOpen() && !(e.target as Element).closest('[data-header]')) close(false);
  });

  window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => {
    if (e.matches && isOpen()) close(false);
  });
}

/* ------------------------------------------------------ Entrance motion */

function initReveals() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -5% 0px' },
  );
  items.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------- Copy to clipboard */

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function initCopyButtons() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
    const textEl = button.querySelector<HTMLElement>('[data-copy-text]');
    const original = textEl?.textContent ?? '';
    let timer: number | undefined;
    button.addEventListener('click', async () => {
      const ok = await copyText(button.dataset.copy ?? '');
      if (textEl) textEl.textContent = ok ? (button.dataset.copyLabel ?? 'Copied') : 'Copy failed';
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (textEl) textEl.textContent = original;
      }, 2000);
    });
  });
}

/* ------------------------------------------------------- Project filter */

function initProjectFilter() {
  const list = document.querySelector<HTMLElement>('[data-project-list]');
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const status = document.querySelector<HTMLElement>('[data-filter-status]');
  if (!list || !buttons.length) return;

  const items = Array.from(list.querySelectorAll<HTMLElement>('[data-project]'));
  const groups = Array.from(list.querySelectorAll<HTMLElement>('[data-category]'));

  const apply = (view: string, fromUser = false) => {
    list.dataset.view = view;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === view)));

    let shown = 0;
    for (const item of items) {
      const visible =
        view === 'all' ||
        (view === 'selected' ? item.hasAttribute('data-selected') : item.dataset.project === view);
      item.hidden = !visible;
      if (visible) {
        shown++;
        // Items that were hidden never intersected the viewport; show them at once.
        if (fromUser) item.classList.add('is-visible');
      }
    }
    for (const group of groups) {
      group.hidden = !group.querySelector('[data-project]:not([hidden])');
      const cards = group.querySelector<HTMLElement>('.cards');
      if (cards) cards.hidden = !cards.querySelector('[data-project]:not([hidden])');
    }

    const label = buttons.find((b) => b.dataset.filter === view)?.firstChild?.textContent?.trim();
    if (status) status.textContent = `Showing ${shown} ${shown === 1 ? 'project' : 'projects'}: ${label}`;
  };

  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      apply(b.dataset.filter ?? 'selected', true);
      // Keep the active option in view when the bar scrolls sideways on phones.
      b.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }),
  );

  apply(list.dataset.view ?? 'selected');
}

/* ------------------------------------------------------------------ Boot */

initTheme();
initHeader();
initActiveSection();
initMobileMenu();
initReveals();
initCopyButtons();
initProjectFilter();

document.querySelectorAll<HTMLElement>('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
