import { loadIncludes } from './utils/include.js';
import { loadAnalytics } from './utils/analytics.js';
import { initHeader } from './components/header.js';
import { initFooter } from './components/footer.js';
import { initBoardMembers } from './components/board-members.js';

async function init() {
  // 1. Injeta header, footer e seções (todos os fetch rodam em paralelo)
  await loadIncludes();

  // 2. Liga o comportamento de cada componente que existir na página
  initHeader();
  initFooter();
  initBoardMembers();

  // 3. Métricas (somente em produção)
  loadAnalytics();
}

// Scripts type="module" já são deferidos: o DOM está pronto aqui.
init();
