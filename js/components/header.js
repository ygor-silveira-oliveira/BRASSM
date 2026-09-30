/**
 * Header: menu mobile (hambúrguer) e submenus em sanfona.
 * Equivale aos dois useState do Header.tsx original:
 *   mobileMenuOpen -> state.mobileMenuOpen
 *   openSubmenu    -> state.openSubmenu
 * No desktop o dropdown é 100% CSS (:hover / :focus-within).
 */
const NAV_OPEN = 'site-header__nav--open';
const ITEM_OPEN = 'site-header__nav-item--submenu-open';

export function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const menuToggle = header.querySelector('[data-menu-toggle]');
  const nav = header.querySelector('[data-nav]');
  const items = [...header.querySelectorAll('[data-nav-item]')];

  const state = { mobileMenuOpen: false, openSubmenu: null };

  function render() {
    nav.classList.toggle(NAV_OPEN, state.mobileMenuOpen);
    menuToggle.setAttribute('aria-expanded', String(state.mobileMenuOpen));

    for (const item of items) {
      const isOpen = item.dataset.label === state.openSubmenu;
      item.classList.toggle(ITEM_OPEN, isOpen);
      item.querySelector('[data-submenu-toggle]')?.setAttribute('aria-expanded', String(isOpen));
    }
  }

  function closeAll() {
    state.mobileMenuOpen = false;
    state.openSubmenu = null;
    render();
  }

  menuToggle.addEventListener('click', () => {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    render();
  });

  for (const item of items) {
    item.querySelector('[data-submenu-toggle]')?.addEventListener('click', () => {
      const label = item.dataset.label;
      state.openSubmenu = state.openSubmenu === label ? null : label;
      render();
    });
  }

  // Qualquer link do header (logo, itens, subitens) fecha o menu, como no original
  header.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeAll();
  });

  markCurrentPage(header);
}

/** Acessibilidade: indica ao leitor de tela qual é a página atual (sem alteração visual). */
function markCurrentPage(header) {
  const normalize = (path) => (path.length > 1 ? path.replace(/\/+$/, '') : path);
  const current = normalize(location.pathname.replace(/index\.html$/, ''));
  for (const link of header.querySelectorAll('a[href]')) {
    if (normalize(new URL(link.href).pathname) === current) {
      link.setAttribute('aria-current', 'page');
    }
  }
}
