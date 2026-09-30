const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initTheme() {
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dark = document.documentElement.classList.toggle('dark');
      try {
        localStorage.setItem('theme', dark ? 'dark' : 'light');
      } catch {
        // storage unavailable (private mode) — theme still switches for this visit
      }
    });
  });
}

function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const update = () => (header.dataset['scrolled'] = String(window.scrollY > 8));
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute(
      'aria-label',
      (open ? toggle.dataset['labelClose'] : toggle.dataset['labelOpen']) ?? '',
    );
    menu.hidden = !open;
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  window
    .matchMedia('(min-width: 1024px)')
    .addEventListener('change', (e) => e.matches && setOpen(false));
}

function initTyping() {
  const el = document.querySelector<HTMLElement>('[data-typing]');
  if (!el || reducedMotion) return;
  const words: string[] = JSON.parse(el.dataset['words'] ?? '[]');
  if (words.length < 2) return;

  let word = 0;
  let chars = words[0]!.length;
  let deleting = true;

  const tick = () => {
    const current = words[word]!;
    chars += deleting ? -1 : 1;
    el.textContent = current.slice(0, chars);

    let delay = deleting ? 40 : 80;
    if (!deleting && chars === current.length) {
      deleting = true;
      delay = 2200;
    } else if (deleting && chars === 0) {
      deleting = false;
      word = (word + 1) % words.length;
      delay = 300;
    }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 2500);
}

function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  items.forEach((el) => io.observe(el));
}

function initActiveNav() {
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]');
  if (!links.length) return;
  const byId = new Map([...links].map((l) => [l.dataset['navLink'], l]));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.removeAttribute('aria-current'));
        byId.get(entry.target.id)?.setAttribute('aria-current', 'true');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  byId.forEach((_, id) => {
    const section = id && document.getElementById(id);
    if (section) io.observe(section);
  });
}

function initCopy() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    const label = btn.querySelector<HTMLElement>('[data-copy-label]');
    const original = label?.textContent ?? '';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset['copy'] ?? '');
        if (label) label.textContent = btn.dataset['copiedLabel'] ?? original;
        setTimeout(() => label && (label.textContent = original), 2000);
      } catch {
        window.location.href = `mailto:${btn.dataset['copy']}`;
      }
    });
  });
}

initTheme();
initHeader();
initMenu();
initTyping();
initReveal();
initActiveNav();
initCopy();
