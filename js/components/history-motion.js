/** One-time entrances and frame-scheduled photo movement, scoped to History. */
export function initHistoryMotion() {
  const page = document.querySelector('.history-page');
  if (!page || !('IntersectionObserver' in window)) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches) return;
  const targets = page.querySelectorAll(
    '.history-hero__content, .history-hero__visual, .history-story__heading, .history-chapter'
  );
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('history-entered');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  targets.forEach((target) => observer.observe(target));
  const hero = page.querySelector('.history-hero');
  const photo = page.querySelector('.history-hero__image');
  let frame = null;
  function updatePhoto() {
    frame = null;
    if (!hero || !photo) return;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const offset = Math.max(-18, Math.min(18, -rect.top * 0.045));
    photo.style.setProperty('--history-photo-offset', `${offset}px`);
  }
  function schedulePhoto() {
    if (frame === null) frame = requestAnimationFrame(updatePhoto);
  }
  window.addEventListener('scroll', schedulePhoto, { passive: true });
  window.addEventListener('resize', schedulePhoto);
  schedulePhoto();

  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    observer.disconnect();
    window.removeEventListener('scroll', schedulePhoto);
    window.removeEventListener('resize', schedulePhoto);
    if (frame !== null) cancelAnimationFrame(frame);
    photo?.style.removeProperty('--history-photo-offset');
    targets.forEach((target) => target.classList.remove('history-entered'));
  });
}
