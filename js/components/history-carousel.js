/** Rotate the History photos every three seconds without navigation controls. */
export function initHistoryCarousel() {
  const image = document.querySelector('[data-history-carousel]');
  if (!image || image.dataset.carouselReady) return;
  image.dataset.carouselReady = 'true';

  const slides = [
    { file: 'ourHistory.jpeg', alt: image.alt },
    { file: 'carousel2.jpeg', alt: 'Four conference attendees posing with NASSM 2023 Montreal signs and a Canadian flag' },
    { file: 'carousel3.jpeg', alt: 'Two Brazilian supporters together at a football stadium' },
    { file: 'carousel4.jpeg', alt: 'Two conference attendees holding a Brazilian flag on stage' },
  ].map((slide) => {
    const photo = new Image();
    photo.src = `/assets/images/carousel/${slide.file}`;
    return { ...slide, photo };
  });

  let current = 0;
  let transitioning = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  window.setInterval(async () => {
    if (document.hidden || transitioning) return;
    const next = (current + 1) % slides.length;
    const { photo, alt } = slides[next];
    if (!photo.complete || !photo.naturalWidth) return;
    transitioning = true;
    let exit;
    let entrance;
    try {
      if (!reducedMotion.matches && image.animate) {
        exit = image.animate([
          { opacity: 1, filter: 'blur(0px)', scale: '1' },
          { opacity: 0, filter: 'blur(4px)', scale: '0.985' },
        ], { duration: 220, easing: 'ease-in', fill: 'forwards' });
        await exit.finished;
      }

      image.src = photo.src;
      image.alt = alt;
      current = next;

      if (exit) {
        entrance = image.animate([
          { opacity: 0, filter: 'blur(4px)', scale: '1.025' },
          { opacity: 1, filter: 'blur(0px)', scale: '1' },
        ], { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
        exit.cancel();
        await entrance.finished;
      }
    } finally {
      exit?.cancel();
      entrance?.cancel();
      transitioning = false;
    }
  }, 3000);
}
