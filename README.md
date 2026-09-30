# BRASSM — Brazilian Scholars for Sport Management

Site institucional da BRASSM, em **HTML + CSS + JavaScript puro** (sem framework, sem build, sem `node_modules`).
Migrado de Next.js/React preservando design, layout, textos, URLs e comportamentos.

## Rodar localmente

Os componentes são carregados com `fetch`, então **não abra o `index.html` direto (`file://`)**. Sirva a pasta:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

> Evite o Live Server do VS Code: ele injeta um script de reload dentro dos fragmentos carregados via `fetch`.
> Os caminhos são absolutos (`/css/...`), então o site precisa estar na raiz do domínio (ou do servidor local).

## Estrutura

```
BRASSM/
├── index.html                  Home (só o "esqueleto"; as seções vêm de components/home/)
├── <rota>/index.html           Uma pasta por página interna (about, history, board-members, conference/2026, ...)
├── 404.html                    Página não encontrada (a Vercel a usa automaticamente)
├── site.webmanifest
├── assets/
│   ├── images/                 hero/, members/, logos
│   └── icons/                  favicons e ícones do manifest
├── css/
│   ├── variables.css           Tokens de design (cores, espaçamentos, raios, transições)
│   ├── style.css               Reset, tipografia, layout base
│   ├── components.css          Header, footer, botões, seções da Home, páginas internas, Board Members
│   └── responsive.css          Ajustes responsivos globais (tokens, h1/h2, seções)
├── components/
│   ├── header.html · footer.html · board-members.html
│   └── home/                   hero, intro, history, conference, initiatives, partners, membership
└── js/
    ├── main.js                 Ponto de entrada (type="module", carregado com defer implícito)
    ├── components/             header.js (menu mobile/submenus) · footer.js (ano) · board-members.js (cards)
    ├── data/members.js         Dados do Board Members
    └── utils/                  include.js (carrega componentes) · analytics.js (Vercel, só em produção)
```

## Como funciona

- **Componentes:** qualquer `<div data-include="/components/xxx.html"></div>` é substituído pelo HTML do arquivo
  (`js/utils/include.js`). Todos os fetch rodam em paralelo e são inseridos de uma vez.
- **Header:** estado (`mobileMenuOpen`, `openSubmenu`) em `js/components/header.js`. O dropdown do desktop é só CSS.
- **Páginas internas:** cada uma tem seu `<title>`, `<meta description>` e conteúdo direto no HTML.

## Tarefas comuns

**Editar os membros do Board:** abra `js/data/members.js`, preencha `name`, `role` e `university` de cada item
(campos vazios não aparecem). Para incluir alguém, copie uma linha e aponte `image` para a foto em `assets/images/members/`.

**Criar uma página:** copie uma pasta existente (ex.: `about/`), edite o conteúdo e o `<head>`, e adicione o link em
`components/header.html` (e `components/footer.html`, se fizer sentido).

**Mudar cores/espaçamentos:** `css/variables.css`.

## Deploy (Vercel)

Site 100% estático: sem comando de build e sem diretório de saída (deploy da raiz).
Para as métricas, ative **Web Analytics** no painel da Vercel — o script (`/_vercel/insights/script.js`) só é carregado fora de `localhost`.

## Pendências conhecidas

- **Open Graph:** `og:image` usa `https://brassm.org/...` (domínio assumido). Se o domínio final for outro, faça uma busca e troque nos `.html`.
- **Foto da seção "Our history"** (`components/home/history.html`) continua vindo do Unsplash. Baixe-a para `assets/images/` para não depender de rede externa.
- `assets/icons/favicon.svg` (194 KB, embute JPEGs), `assets/icons/logo.ico` e `assets/images/logo_maior.jpeg` vieram do projeto original; os dois últimos não são usados.
