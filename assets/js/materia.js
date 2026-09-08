/* =============================================================
   MATÉRIA — renderiza os capítulos a partir de data/conteudo.js
   ============================================================= */

let PIPES = [];

function bl(b){
  switch(b.t){
    case 'p':   return '<p>' + b.v + '</p>';
    case 'h3':  return '<h3 class="sub">' + b.v + '</h3>';
    case 'h4':  return '<h4 class="sub2">' + b.v + '</h4>';
    case 'ul':  return '<ul>' + b.v.map(i => '<li>' + i + '</li>').join('') + '</ul>';
    case 'ol':  return '<ol>' + b.v.map(i => '<li>' + i + '</li>').join('') + '</ol>';
    case 'note':return '<div class="note ' + (b.kind||'') + '">' + b.v + '</div>';
    case 'code':return '<div><span class="code-label">' + (b.lang||'código') + '</span><pre><code>' + esc(b.v) + '</code></pre></div>';
    case 'table':
      return '<div class="tbl-wrap"><table><thead><tr>' + b.head.map(h => '<th>' + h + '</th>').join('') +
             '</tr></thead><tbody>' + b.rows.map(r => '<tr>' + r.map(c => '<td>' + c + '</td>').join('') + '</tr>').join('') +
             '</tbody></table></div>';
    case 'cards':
      return '<div class="grid ' + (b.v.length > 4 ? 'g3' : 'g2') + '">' + b.v.map(c =>
        '<div class="minicard">' + (c.n ? '<span class="n">' + c.n + '</span>' : '') +
        (c.ico ? '<span class="ico">' + c.ico + '</span>' : '') +
        '<b>' + c.t + '</b><span>' + c.d + '</span></div>').join('') + '</div>';
    case 'split':
      return '<div class="split"><div class="up"><div class="h">✔ Favorecem</div><ul>' +
             b.up.map(i => '<li>' + i + '</li>').join('') + '</ul></div>' +
             '<div class="down"><div class="h">✖ Prejudicam</div><ul>' +
             b.down.map(i => '<li>' + i + '</li>').join('') + '</ul></div></div>';
    case 'flow':
      return '<div class="flow">' + b.v.map(i => i.box
        ? '<div class="fbox' + (i.accent ? ' accent' : '') + '">' + i.box + '</div>'
        : '<div class="farrow">↓</div>' + (i.arrow ? '<div class="flabel">' + i.arrow + '</div>' : '')
      ).join('') + '</div>';
    case 'flowh':
      return '<div class="flow-h">' + b.v.map(x => /^[→←↔]|^→/.test(x.trim()) || x.trim().startsWith('→')
        ? '<span class="flabel">' + x + '</span>'
        : '<div class="fbox">' + x + '</div>').join('<span class="farrow">→</span>') + '</div>';
    case 'svg':
      return '<figure>' + b.v + (b.cap ? '<figcaption>' + b.cap + '</figcaption>' : '') + '</figure>';
    case 'pipe': {
      const idx = PIPES.push(b.v) - 1;
      return '<div class="pipe" data-pipe="' + idx + '"></div>';
    }
    default: return '';
  }
}

function pintarPipe(node){
  const passos = PIPES[+node.dataset.pipe];
  let atual = +(node.dataset.step || 0);

  const lado = io => io.k === 'svg'
    ? '<figure style="margin:0">' + io.v + '</figure>'
    : '<pre><code>' + esc(io.v) + '</code></pre>';

  function pintar(){
    const p = passos[atual];
    node.innerHTML =
      '<div class="pipe-steps">' + passos.map((s,i) =>
        '<button data-i="' + i + '" class="' + (i===atual?'on':'') + '">' + esc(s.fase) + '</button>').join('') + '</div>' +
      '<div class="pipe-body">' +
        '<h5>' + esc(p.fase) + '</h5>' +
        '<p class="muted" style="margin:0">' + p.nota + '</p>' +
        '<div class="pipe-io">' +
          '<div><span class="code-label">entrada</span>' + lado(p.ent) + '</div>' +
          '<div class="pipe-mid">→<div style="font-size:11px;font-family:var(--mono);color:var(--muted)">' + esc(p.box) + '</div></div>' +
          '<div><span class="code-label">saída</span>' + lado(p.sai) + '</div>' +
        '</div>' +
        '<div class="pipe-nav">' +
          '<button class="btn sm" data-nav="-1"' + (atual===0?' disabled':'') + '>← Anterior</button>' +
          '<button class="btn sm primary" data-nav="1"' + (atual===passos.length-1?' disabled':'') + '>Próxima fase →</button>' +
        '</div>' +
      '</div>';

    qsa('.pipe-steps button', node).forEach(b => b.onclick = () => { atual = +b.dataset.i; pintar(); });
    qsa('[data-nav]', node).forEach(b => b.onclick = () => {
      atual = Math.min(passos.length-1, Math.max(0, atual + (+b.dataset.nav))); pintar();
    });
  }
  pintar();
}

function renderMateria(root, prova){
  PIPES = [];
  const caps = CONTEUDO[prova] || [];

  if(!caps.length){ root.innerHTML = vazioP2('a matéria'); return; }

  const toc = caps.map(c =>
    '<a href="#' + c.id + '" class="lvl1"><b>' + esc(c.titulo.split('—')[0].trim()) + '</b></a>' +
    c.secoes.map(s => '<a href="#' + s.id + '" class="lvl2">' + (s.num ? s.num + ' ' : '') + esc(s.titulo) + '</a>').join('')
  ).join('');

  const corpo = caps.map(c =>
    // o capítulo é UM bloco: cabeçalho + seções como partes dele,
    // mesma anatomia dos grupos de exercícios (.grupo / .grupo-itens)
    '<article class="grupo" id="' + c.id + '">' +
      '<header class="grupo-head">' +
        '<div class="grupo-tt"><h2>' + esc(c.titulo) + '</h2></div>' +
        '<p class="grupo-en">' + esc(c.subtitulo) + '</p>' +
      '</header>' +
      '<div class="grupo-itens">' +
        c.secoes.map(s =>
          '<section class="bloco" id="' + s.id + '">' +
            '<div class="blk-head">' +
              (s.num ? '<span class="num">' + s.num + '</span>' : '') +
              '<h2>' + esc(s.titulo) + '</h2>' +
            '</div>' +
            '<div class="blk-body">' + s.blocos.map(bl).join('') + '</div>' +
          '</section>'
        ).join('') +
      '</div>' +
    '</article>'
  ).join('');

  root.innerHTML =
    '<div class="page-head">' +
      '<span class="eyebrow">📚 Prova ' + prova.toUpperCase().replace('P','') + ' · matéria</span>' +
      '<h1>Matéria da ' + (prova === 'p1' ? '1ª' : '2ª') + ' prova</h1>' +
      '<p>Transcrição organizada dos slides. Use o índice ao lado para navegar e o passo a passo interativo das fases do compilador para revisar o exemplo que sempre cai.</p>' +
    '</div>' +
    '<div class="layout"><nav class="toc"><h4>Índice</h4>' + toc + '</nav><div>' + corpo + '</div></div>';

  qsa('.pipe', root).forEach(pintarPipe);

  // destaque do índice conforme a rolagem
  const alvos = qsa('section[id], article[id]', root);
  const links = qsa('.toc a', root);
  const onScroll = () => {
    let ativo = null;
    alvos.forEach(a => { if(a.getBoundingClientRect().top <= 140) ativo = a.id; });
    links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + ativo));
  };
  window.removeEventListener('scroll', window.__tocScroll || (()=>{}));
  window.__tocScroll = onScroll;
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
}

function vazioP2(oque){
  return '<div class="page-head"><span class="eyebrow">🚧 Prova 2</span><h1>Ainda não tem conteúdo aqui</h1></div>' +
    '<div class="empty"><div class="big">📥</div><h3>' + oque[0].toUpperCase() + oque.slice(1) + ' da 2ª prova entra aqui</h3>' +
    '<p>O site já está preparado para o semestre inteiro. Quando os capítulos da P2 chegarem, é só preencher a chave <code>p2</code> nos arquivos da pasta <code>data/</code> — a estrutura é a mesma da P1 e nada no código precisa mudar.</p>' +
    '<p class="muted">Arquivos: <code>data/conteudo.js</code> · <code>data/exercicios-originais.js</code> · <code>data/exercicios-ia.js</code> · <code>data/formulario.js</code></p></div>';
}
