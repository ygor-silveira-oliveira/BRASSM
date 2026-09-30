import { members } from '../data/members.js';

/** Board Members: gera um card por item de js/data/members.js usando o <template> do componente. */
export function initBoardMembers() {
  const list = document.getElementById('board-members-list');
  const template = document.getElementById('board-card-template');
  if (!list || !template) return;

  const fragment = document.createDocumentFragment();

  members.forEach((member, index) => {
    const card = template.content.firstElementChild.cloneNode(true);

    const image = card.querySelector('.board-card__image');
    image.src = member.image;
    image.alt = member.name || `Board member ${index + 1}`;

    for (const field of ['name', 'role', 'university']) {
      const element = card.querySelector(`.board-card__${field}`);
      if (member[field]) element.textContent = member[field];
      else element.remove(); // campo vazio não ocupa espaço
    }
    if (!card.querySelector('.board-card__body').children.length) {
      card.querySelector('.board-card__body').remove();
    }

    fragment.appendChild(card);
  });

  list.replaceChildren(fragment);
}
