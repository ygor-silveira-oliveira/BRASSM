/**
 * Carrega componentes HTML declarados no markup:
 *   <div data-include="/components/header.html"></div>
 * Todos os fetch rodam em paralelo e os placeholders são trocados de uma só vez,
 * para a página não "piscar" com partes faltando.
 */
export async function loadIncludes(root = document) {
  const slots = [...root.querySelectorAll('[data-include]')];

  const results = await Promise.all(
    slots.map(async (slot) => {
      const url = slot.dataset.include;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        return { slot, html: await response.text() };
      } catch (error) {
        console.error(`[include] Falha ao carregar ${url}:`, error);
        return { slot, html: null };
      }
    })
  );

  for (const { slot, html } of results) {
    if (html === null) continue;
    const template = document.createElement('template');
    template.innerHTML = html;
    slot.replaceWith(template.content);
  }
}
