/** Footer: preenche o ano atual (antes: new Date().getFullYear()). */
export function initFooter() {
  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();
}
