/** One-time, restrained reveals; profiles remain visible without animation support. */
export function initBoardMotion() {
  const board = document.querySelector('.board');
  if (!board || !('IntersectionObserver' in window)) return;

  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const profiles = [...board.querySelectorAll('.board-card')];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('board-card--entered');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

  function syncMotion() {
    observer.disconnect();
    for (const profile of profiles) {
      profile.classList.remove('board-card--motion', 'board-card--entered');
      if (!preference.matches) {
        profile.classList.add('board-card--motion');
        observer.observe(profile);
      }
    }
  }

  preference.addEventListener('change', syncMotion);
  syncMotion();
}
