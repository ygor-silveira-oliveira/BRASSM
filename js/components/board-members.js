import { members } from '../data/members.js';
import { initBoardMotion } from './board-motion.js';

/** Board Members: gera um card por item de js/data/members.js usando o <template> do componente. */
export function initBoardMembers() {
  const list = document.getElementById('board-members-list');
  const template = document.getElementById('board-card-template');
  if (!list || !template) return;

  const fragment = document.createDocumentFragment();

  members.forEach((member, index) => {
    const card = template.content.firstElementChild.cloneNode(true);

    if (['President', 'Vice-President'].includes(member.role)) {
      card.classList.add('board-card--leadership');
    }
    if (member.role === 'Vice-President') {
      card.classList.add('board-card--vice');
    }

    const image = card.querySelector('.board-card__image');
    image.src = member.image;
    image.alt = member.name && member.name !== 'Name to be confirmed'
      ? member.name
      : `Temporary portrait for board profile ${index + 1}`;

    for (const field of ['name', 'role', 'university', 'description']) {
      const element = card.querySelector(`.board-card__${field}`);
      if (member[field]) element.textContent = member[field];
      else element.remove(); // campo vazio não ocupa espaço
    }
    const linkedIn = card.querySelector('.board-card__linkedin');
    if (member.linkedin) {
      linkedIn.href = member.linkedin;
      linkedIn.target = '_blank';
      linkedIn.rel = 'noopener noreferrer';
      linkedIn.removeAttribute('aria-disabled');
      linkedIn.setAttribute('aria-label', `LinkedIn — ${member.name || member.role}`);
      linkedIn.title = 'LinkedIn';
    }
    if (!card.querySelector('.board-card__body').children.length) {
      card.querySelector('.board-card__body').remove();
    }

    fragment.appendChild(card);
  });

  list.replaceChildren(fragment);
  initBoardMotion();
}
