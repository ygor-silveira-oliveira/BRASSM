import { homeSections } from '../data/home-sections.js';

/** Home: gera um bloco (imagem + título + texto) por item de js/data/home-sections.js. */
export function initHomeSections() {
  const list = document.getElementById('home-sections-list');
  const template = document.getElementById('home-section-template');
  if (!list || !template) return;

  const fragment = document.createDocumentFragment();

  homeSections.forEach((section) => {
    const item = template.content.firstElementChild.cloneNode(true);

    if (section.reverse) item.classList.add('home-section-item--reverse');

    const image = item.querySelector('.home-section-image');
    image.src = section.image;
    image.alt = section.alt || '';
    image.loading = 'lazy';

    item.querySelector('.home-section-title').textContent = section.title;
    item.querySelector('.home-section-text').textContent = section.text;

    fragment.appendChild(item);
  });

  list.replaceChildren(fragment);
}
