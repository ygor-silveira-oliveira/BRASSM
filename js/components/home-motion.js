/** Gentle, one-time reveals and scroll movement scoped to the home page. */
export function initHomeMotion() {
  const sections = [...document.querySelectorAll('.home-page main .home-hero')];
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  let frame = null;

  function update() {
    frame = null;
    const height = window.innerHeight;
    for (const section of active) {
      const bounds = section.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1,
        (height / 2 - bounds.top - bounds.height / 2) / height));
      const distance = Math.min(64, bounds.height * 0.055);
      section.style.setProperty('--home-image-shift', `${progress * distance}px`);
    }
  }

  function schedule() {
    if (frame === null && active.size) frame = window.requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        active.add(entry.target);
        entry.target.classList.add('home-hero--revealed');
      } else {
        active.delete(entry.target);
      }
    }
    schedule();
  }, { threshold: 0.12 });

  function syncPreference() {
    observer.disconnect();
    active.clear();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    for (const section of sections) {
      section.classList.remove('home-hero--motion', 'home-hero--revealed');
      section.style.removeProperty('--home-image-shift');
      if (!preference.matches) {
        section.classList.add('home-hero--motion');
        observer.observe(section);
      }
    }
    if (!preference.matches) {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    }
  }

  preference.addEventListener('change', syncPreference);
  syncPreference();
}
