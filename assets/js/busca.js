/* =============================================================
   BUSCA NO MATERIAL  (⌘K / Ctrl+K)
   Indexa matéria, exercícios e formulário da prova selecionada e
   responde localmente — nenhuma requisição sai do navegador.
   Também monta um prompt com os trechos encontrados para levar a
   dúvida a uma IA já com o contexto do material junto.
   ============================================================= */

let IDX = null, IDX_PROVA = null;
let PAL_RES = [], PAL_SEL = 0, PAL_ABERTA = false;

/* ---------- extração de texto ---------- */
function semTags(h){ return String(h == null ? '' : h).replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim(); }

function textoDoBloco(b){
  switch(b.t){
    case 'p': case 'h3': case 'h4': case 'note': return semTags(b.v);
    case 'ul': case 'ol': case 'flowh': return b.v.map(semTags).join(' · ');
    case 'code': return b.v;
    case 'table': return (b.head||[]).map(semTags).join(' ') + ' ' + b.rows.map(r => r.map(semTags).join(' ')).join(' · ');
    case 'cards': return b.v.map(c => semTags(c.t) + ': ' + semTags(c.d)).join(' · ');
    case 'split': return 'Favorecem: ' + b.up.map(semTags).join(' · ') + '. Prejudicam: ' + b.down.map(semTags).join(' · ');
    case 'flow': return b.v.map(i => semTags(i.box || i.arrow || '')).filter(Boolean).join(' → ');
    case 'pipe': return b.v.map(f => f.fase + ': ' + semTags(f.nota) + ' Entrada: ' + semTags(f.ent.k === 'code' ? f.ent.v : '') + ' Saída: ' + semTags(f.sai.k === 'code' ? f.sai.v : '')).join('\n');
    default: return '';
  }
}

function construirIndice(prova){
  if(IDX && IDX_PROVA === prova) return IDX;
  const idx = [];

  (CONTEUDO[prova] || []).forEach(cap => cap.secoes.forEach(sec => {
    idx.push({
      tipo:'Matéria', ico:'📚',
      rotulo:(sec.num ? sec.num + ' ' : '') + sec.titulo,
      sub:cap.titulo.split('—')[0].trim(),
      texto:sec.blocos.map(textoDoBloco).filter(Boolean).join('\n'),
      rota:'materia', ancora:sec.id
    });
  }));

  [['orig', EX_ORIGINAIS], ['ia', EX_IA]].forEach(([aba, src]) =>
    (src[prova] || []).forEach(g => g.itens.forEach(it => {
      idx.push({
        tipo: aba === 'ia' ? 'Exercício (IA)' : 'Exercício', ico: aba === 'ia' ? '🤖' : '✍️',
        rotulo:semTags(it.titulo), sub:g.grupo,
        texto:semTags(it.enunciado || '') + ' ' + semTags(g.enunciado) + ' ' +
              (it.tokens ? it.tokens.filter(t => t.lex).map(t => t.lex).join(' ') : ''),
        rota:'exercicios', exId:it.id, aba:aba
      });
    })));

  (FORMULARIO[prova] || []).forEach(c => {
    let txt = '';
    if(c.tipo === 'table') txt = (c.head||[]).map(semTags).join(' ') + ' ' + c.rows.map(r => r.map(semTags).join(' — ')).join(' · ');
    else if(c.tipo === 'list') txt = c.v.map(semTags).join(' · ');
    else if(c.tipo === 'kv') txt = c.v.map(p => semTags(p[0]) + ': ' + semTags(p[1])).join(' · ');
    idx.push({tipo:'Formulário', ico:'📋', rotulo:c.titulo, sub:'consulta rápida', texto:txt, rota:'formulario', ancora:c.id});
  });

  idx.forEach(e => { e._r = norm(e.rotulo); e._t = norm(e.texto); e._s = norm(e.sub); });
  IDX = idx; IDX_PROVA = prova;
  return idx;
}

/* ---------- pontuação ---------- */
/* palavras vazias: sem isto, "o que é coerção?" casa com tudo que tem "que" */
const VAZIAS = new Set(('o a os as um uma uns umas de do da dos das em no na nos nas por para pra com sem ' +
  'que qual quais quando como onde porque e ou se seu sua seus suas ao aos ser sao isso isto esse essa este esta ' +
  'eu me meu minha voce vc sobre pode poderia explique explica explicar diga fale falar saber entender significa ' +
  'significado quero queria gostaria preciso ajuda ajudar diferenca? nao sim ha tem ter mais menos muito pouco ' +
  'entao assim tudo todo toda todos todas qualquer cada ja ainda tambem').split(' '));

function termosDaBusca(q){
  const brutos = norm(q).replace(/[?!.,;:]/g, ' ').split(/\s+/).filter(Boolean);
  const uteis = brutos.filter(t => t.length > 2 && !VAZIAS.has(t));
  return uteis.length ? uteis : brutos.filter(t => t.length > 1);
}

function buscar(q, sotexto){
  const termos = termosDaBusca(q);
  if(!termos.length) return [];
  const idx = construirIndice(DB.d.prova);
  const frase = norm(q);

  return idx.map(e => {
    let pontos = 0, faltou = false;
    termos.forEach(t => {
      let p = 0;
      if(e._r.indexOf(t) >= 0) p += 12;
      if(e._s.indexOf(t) >= 0) p += 4;
      const oc = e._t.split(t).length - 1;
      if(oc) p += Math.min(oc, 6) * 2;
      if(!p) faltou = true;
      pontos += p;
    });
    if(faltou) pontos = pontos * 0.25;
    if(e._r.indexOf(frase) >= 0) pontos += 25;
    if(e._t.indexOf(frase) >= 0) pontos += 8;
    if(e.tipo === 'Matéria') pontos *= 1.2;
    if(e.tipo === 'Formulário') pontos *= 1.05;
    if(sotexto && e.rota === 'exercicios') pontos *= 0.35;
    return {e, pontos, termos};
  }).filter(r => r.pontos > 1.5)
    .sort((a,b) => b.pontos - a.pontos)
    .slice(0, 14);
}

function trecho(texto, termos){
  const n = norm(texto);
  let pos = -1;
  for(const t of termos){ const p = n.indexOf(t); if(p >= 0 && (pos < 0 || p < pos)) pos = p; }
  if(pos < 0) pos = 0;
  const ini = Math.max(0, pos - 70);
  let s = texto.slice(ini, ini + 200).replace(/\n/g, ' ');
  if(ini > 0) s = '…' + s;
  if(ini + 200 < texto.length) s += '…';
  let out = esc(s);
  termos.forEach(t => {
    const re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    out = out.replace(re, '<em>$1</em>');
  });
  return out;
}

/* ---------- prompt para a IA ---------- */
function montarPrompt(q, resultados, limite){
  const partes = resultados.slice(0, 4).map(r => {
    const corpo = r.e.texto.slice(0, Math.floor(limite / 4));
    return '### ' + r.e.rotulo + '  (' + r.e.tipo + ')\n' + corpo;
  });
  return 'Você é meu tutor da disciplina C05 — Linguagens de Programação e Compiladores.\n' +
    'Responda em português, de forma direta, usando APENAS o material abaixo. ' +
    'Se o material não cobrir a pergunta, diga isso claramente em vez de inventar.\n\n' +
    'PERGUNTA: ' + q + '\n\n===== MATERIAL DA DISCIPLINA =====\n' + partes.join('\n\n');
}

/* ---------- UI ---------- */
function abrirPaleta(texto){
  PAL_ABERTA = true;
  const pal = qs('#pal');
  pal.hidden = false;
  document.body.classList.add('pal-aberta');
  requestAnimationFrame(() => pal.classList.add('on'));
  const inp = qs('#palQ');
  if(texto != null) inp.value = texto;
  inp.focus(); inp.select();
  desenharPaleta();
}

function fecharPaleta(){
  PAL_ABERTA = false;
  const pal = qs('#pal');
  pal.classList.remove('on');
  document.body.classList.remove('pal-aberta');
  setTimeout(() => { if(!PAL_ABERTA) pal.hidden = true; }, 180);
}

function desenharPaleta(){
  const q = qs('#palQ').value.trim();
  const box = qs('#palRes');
  const cont = qs('#palCount');

  if(!q){
    PAL_RES = []; PAL_SEL = 0;
    box.innerHTML = '<div class="pal-vazio">' +
      '<p><b>Busque em tudo de uma vez</b> — matéria, exercícios e formulário da ' + DB.d.prova.toUpperCase() + '.</p>' +
      '<div class="pal-sug">' +
        ['coerção','fecho de Kleene','tabela de símbolos','linker','ortogonalidade','três endereços','bytecode','lexema']
          .map(t => '<button data-sug="' + t + '">' + t + '</button>').join('') +
      '</div>' +
      '<p class="muted">A busca roda no seu navegador, sem internet. Se quiser uma explicação, dá para levar a pergunta <b>junto com os trechos do material</b> para uma IA.</p>' +
    '</div>';
    cont.textContent = construirIndice(DB.d.prova).length + ' trechos indexados';
    qsa('[data-sug]', box).forEach(b => b.onclick = () => { qs('#palQ').value = b.dataset.sug; desenharPaleta(); });
    return;
  }

  PAL_RES = buscar(q);
  PAL_SEL = 0;
  cont.textContent = PAL_RES.length ? PAL_RES.length + ' resultado(s)' : '';

  const lista = PAL_RES.length
    ? PAL_RES.map((r, i) =>
        '<button class="pal-item' + (i === 0 ? ' sel' : '') + '" data-i="' + i + '">' +
          '<span class="pal-ico">' + r.e.ico + '</span>' +
          '<span class="pal-txt"><b>' + esc(r.e.rotulo) + '</b>' +
            '<small>' + trecho(r.e.texto, r.termos) + '</small></span>' +
          '<span class="pal-tag">' + esc(r.e.tipo) + '</span>' +
        '</button>').join('')
    : '<div class="pal-vazio"><p>Nada encontrado para <b>' + esc(q) + '</b> na ' + DB.d.prova.toUpperCase() + '.</p>' +
      '<p class="muted">Tente outra palavra — ou leve a pergunta para uma IA com o material junto, abaixo.</p></div>';

  box.innerHTML = lista + montarBlocoIA(q);

  qsa('.pal-item', box).forEach(b => {
    b.onclick = () => irPara(PAL_RES[+b.dataset.i].e);
    b.onmouseenter = () => { PAL_SEL = +b.dataset.i; marcarSel(); };
  });
  ligarBotoesIA(q);
}

function montarBlocoIA(q){
  return '<div class="pal-ia">' +
    '<div class="pal-ia-h">🤖 Perguntar a uma IA <span class="chip">com os trechos do material anexados</span></div>' +
    '<p class="muted">Monta um prompt com sua pergunta + os trechos encontrados acima e manda para a IA que você preferir. ' +
    'O site não tem servidor nem chave de API — quem conversa com a IA é você.</p>' +
    '<div class="pal-ia-btns">' +
      '<button class="btn sm primary" data-ia="copiar">📋 Copiar pergunta + material</button>' +
      '<button class="btn sm" data-ia="claude">Abrir no Claude ↗</button>' +
      '<button class="btn sm" data-ia="gpt">Abrir no ChatGPT ↗</button>' +
    '</div></div>';
}

function ligarBotoesIA(q){
  const res = PAL_RES.length ? PAL_RES : buscar(q);
  qsa('[data-ia]').forEach(b => b.onclick = () => {
    const acao = b.dataset.ia;
    if(acao === 'copiar'){
      const txt = montarPrompt(q, res, 12000);
      navigator.clipboard && navigator.clipboard.writeText(txt);
      const antes = b.textContent;
      b.textContent = '✓ copiado — cole na sua IA';
      setTimeout(() => b.textContent = antes, 2200);
      return;
    }
    const url = (acao === 'claude' ? 'https://claude.ai/new?q=' : 'https://chatgpt.com/?q=') +
                encodeURIComponent(montarPrompt(q, res, 4000));
    window.open(url, '_blank', 'noopener');
  });
}

function marcarSel(){
  qsa('.pal-item').forEach((b, i) => b.classList.toggle('sel', i === PAL_SEL));
  const at = qsa('.pal-item')[PAL_SEL];
  if(at) at.scrollIntoView({block:'nearest'});
}

function irPara(e){
  fecharPaleta();
  if(e.rota === 'exercicios'){
    DB.d.exTab = e.aba; DB.save();
    location.hash = '#/exercicios';
    setTimeout(() => {
      if(rotaDoHash() === 'exercicios') navegar(true);
      const alvo = qs('[data-ex="' + e.exId + '"]');
      if(alvo){ rolarAte(alvo, 140); piscar(alvo); }
    }, 90);
    return;
  }
  const ir = () => {
    const alvo = document.getElementById(e.ancora);
    if(!alvo) return;
    rolarAte(alvo);
    piscar(alvo.querySelector('.card') || alvo);
  };
  if(rotaDoHash() === e.rota){ ir(); }
  else { location.hash = '#/' + e.rota; setTimeout(ir, 140); }
}

function rolarAte(el, folga){
  const y = el.getBoundingClientRect().top + window.pageYOffset - (folga == null ? 84 : folga);
  window.scrollTo({top:Math.max(0, y), behavior: SEM_MOVIMENTO ? 'auto' : 'smooth'});
}

function piscar(el){
  if(!el) return;
  el.classList.remove('destaque');
  void el.offsetWidth;
  el.classList.add('destaque');
  setTimeout(() => el.classList.remove('destaque'), 1800);
}

/* ---------- init ---------- */
function initBusca(){
  const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  const kbd = qs('#searchKbd');
  if(kbd) kbd.textContent = mac ? '⌘K' : 'Ctrl K';

  qs('#searchBtn').addEventListener('click', () => abrirPaleta(''));
  qs('#palBg').addEventListener('click', fecharPaleta);
  qs('#palQ').addEventListener('input', desenharPaleta);

  document.addEventListener('keydown', ev => {
    if((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k'){ ev.preventDefault(); PAL_ABERTA ? fecharPaleta() : abrirPaleta(''); return; }
    if(ev.key === '/' && !PAL_ABERTA && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)){ ev.preventDefault(); abrirPaleta(''); return; }
    if(!PAL_ABERTA) return;
    if(ev.key === 'Escape'){ ev.preventDefault(); fecharPaleta(); }
    else if(ev.key === 'ArrowDown'){ ev.preventDefault(); PAL_SEL = Math.min(PAL_SEL + 1, PAL_RES.length - 1); marcarSel(); }
    else if(ev.key === 'ArrowUp'){ ev.preventDefault(); PAL_SEL = Math.max(PAL_SEL - 1, 0); marcarSel(); }
    else if(ev.key === 'Enter' && PAL_RES[PAL_SEL]){ ev.preventDefault(); irPara(PAL_RES[PAL_SEL].e); }
  });
}

function invalidarIndice(){ IDX = null; IDX_PROVA = null; }
