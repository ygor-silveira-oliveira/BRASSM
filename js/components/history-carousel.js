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
  window.setInterval(() => {
    if (document.hidden) return;
    const next = (current + 1) % slides.length;
    const { photo, alt } = slides[next];
    if (!photo.complete || !photo.naturalWidth) return;
    image.src = photo.src;
    image.alt = alt;
    current = next;
  }, 3000);
}
