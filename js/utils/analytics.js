/**
 * Vercel Web Analytics sem npm: só carrega em produção (equivale ao antigo
 * `process.env.NODE_ENV === "production"`). Requer Web Analytics ativado no painel da Vercel.
 */
export function loadAnalytics() {
  const host = location.hostname;
  const isLocal = !host || host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
  if (isLocal) return;

  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.appendChild(script);
}
