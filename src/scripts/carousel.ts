/**
 * Scroll-snap carousel: one highlighted slide, swipe/arrows/dots navigation and
 * autoplay driven by the active dot's progress animation (pausing the animation
 * pauses the rotation). Autoplay pauses on hover, keyboard focus, when the
 * carousel is off-screen or the tab is hidden, and via the pause button. It is
 * disabled entirely for users who prefer reduced motion.
 */
type PauseReason = 'hover' | 'focus' | 'offscreen' | 'hidden' | 'user';

export function initCarousel(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>('[data-track]');
  const slides = [...root.querySelectorAll<HTMLElement>('[data-slide]')];
  const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-dot]')];
  const toggle = root.querySelector<HTMLButtonElement>('[data-toggle]');
  if (!track || slides.length < 2) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoplay = !reducedMotion;
  const reasons = new Set<PauseReason>();
  let active = -1;

  root.dataset['autoplay'] = String(autoplay);
  if (!autoplay) toggle?.remove();

  const fillOf = (i: number) => dots[i]?.querySelector<HTMLElement>('[data-fill]');

  const restartProgress = () => {
    dots.forEach((_, i) => fillOf(i)?.classList.remove('is-running'));
    const fill = fillOf(active);
    if (!fill || !autoplay) return;
    void fill.offsetWidth; // restart the CSS animation
    fill.classList.add('is-running');
  };

  const setActive = (index: number) => {
    if (index === active) return;
    active = index;
    slides.forEach((slide, i) => {
      const on = i === index;
      slide.toggleAttribute('data-active', on);
      slide.inert = !on;
    });
    dots.forEach((dot, i) =>
      i === index ? dot.setAttribute('aria-current', 'true') : dot.removeAttribute('aria-current'),
    );
    restartProgress();
  };

  const goTo = (index: number, smooth = true) => {
    const slide = slides[(index + slides.length) % slides.length];
    if (!slide) return;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
      behavior: smooth && !reducedMotion ? 'smooth' : 'auto',
    });
  };

  const nearestToCenter = () => {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDistance = Infinity;
    slides.forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft + slide.clientWidth / 2 - center);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    return best;
  };

  const updatePaused = () => {
    const paused = reasons.size > 0;
    root.toggleAttribute('data-paused', paused);
    // Announce slide changes only while nothing is rotating on its own.
    track.setAttribute('aria-live', autoplay && !paused ? 'off' : 'polite');
    if (toggle) {
      const userPaused = reasons.has('user');
      toggle.dataset['state'] = userPaused ? 'paused' : 'playing';
      toggle.setAttribute(
        'aria-label',
        (userPaused ? toggle.dataset['labelPlay'] : toggle.dataset['labelPause']) ?? '',
      );
    }
  };

  const pause = (reason: PauseReason, on: boolean) => {
    if (on) reasons.add(reason);
    else reasons.delete(reason);
    updatePaused();
  };

  // Active slide follows the scroll position (swipe, arrows, dots, autoplay).
  let frame = 0;
  track.addEventListener(
    'scroll',
    () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(nearestToCenter()));
    },
    { passive: true },
  );

  root.querySelector('[data-prev]')?.addEventListener('click', () => goTo(active - 1));
  root.querySelector('[data-next]')?.addEventListener('click', () => goTo(active + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  toggle?.addEventListener('click', () => pause('user', !reasons.has('user')));

  // Inactive slides are inert, so clicks land on the track: jump to the clicked slide.
  track.addEventListener('click', (event) => {
    const index = slides.findIndex((slide) => {
      const rect = slide.getBoundingClientRect();
      return event.clientX >= rect.left && event.clientX <= rect.right;
    });
    if (index >= 0 && index !== active) goTo(index);
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') goTo(active - 1);
    else if (event.key === 'ArrowRight') goTo(active + 1);
    else return;
    event.preventDefault();
  });

  // Autoplay: advance when the active dot's progress animation completes.
  dots.forEach((_, i) =>
    fillOf(i)?.addEventListener('animationend', () => {
      if (i === active && reasons.size === 0) goTo(active + 1);
    }),
  );

  root.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && pause('hover', true));
  root.addEventListener('pointerleave', (e) => e.pointerType === 'mouse' && pause('hover', false));
  root.addEventListener('focusin', () => pause('focus', true));
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget as Node | null)) pause('focus', false);
  });
  document.addEventListener('visibilitychange', () => pause('hidden', document.hidden));
  new IntersectionObserver(([entry]) => pause('offscreen', !entry?.isIntersecting), {
    threshold: 0.35,
  }).observe(root);

  let resizeFrame = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => goTo(active, false));
  });

  updatePaused();
  setActive(0);
}
