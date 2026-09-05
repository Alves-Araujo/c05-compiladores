/* =============================================================
   EXERCÍCIOS — motor de correção
   Tipos: tokenize | regex | open | mc | multi | tf | order | accept
   ============================================================= */

const CLASSES_TOKEN = ['ID','KW','LT','SP','OP'];
let EX_INDEX = {};

/* ---------- utilidades ---------- */
function setStatus(node, st){
  node.classList.remove('ok','bad');
  if(st === 'ok') node.classList.add('ok');
  if(st === 'bad') node.classList.add('bad');
  const dot = qs('.status-dot', node);
  if(dot){ dot.className = 'status-dot' + (st ? ' ' + st : ''); }
  DB.set(node.dataset.ex, {st:st});
  atualizarProgressoGlobal();
  atualizarStats();
}
function fb(node, cls, html){
  const box = qs('.fb', node);
  box.hidden = false;
  box.className = 'fb ' + (cls||'');
  box.innerHTML = html;
}
function placar(acertos, total){
  const pct = Math.round(100*acertos/total);
  return '<h6>' + (acertos===total ? '✅ Tudo certo!' : (acertos===0 ? '❌ Ainda não' : '⚠️ Quase lá')) +
         ' <span class="chip">' + acertos + '/' + total + ' · ' + pct + '%</span></h6>';
}
function reAncorada(src, flags){ return new RegExp('^(?:' + src + ')$', flags || ''); }
function vazioTxt(s){ return s === '' ? '<i style="opacity:.6">(string vazia)</i>' : esc(s); }

/* =============================================================
   RENDER PRINCIPAL
   ============================================================= */
function renderExercicios(root, prova){
  const orig = EX_ORIGINAIS[prova] || [];
  const ia   = EX_IA[prova] || [];

  if(!orig.length && !ia.length){ root.innerHTML = vazioP2('os exercícios'); return; }

  const tab = DB.d.exTab === 'ia' ? 'ia' : 'orig';
  const grupos = tab === 'ia' ? ia : orig;
  const nOrig = orig.reduce((a,g)=>a+g.itens.length,0);
  const nIA   = ia.reduce((a,g)=>a+g.itens.length,0);

  EX_INDEX = {};
  grupos.forEach(g => g.itens.forEach(i => { i.__ia = (tab === 'ia'); EX_INDEX[i.id] = i; }));

  root.innerHTML =
    '<div class="page-head">' +
      '<span class="eyebrow">✍️ Prova ' + prova.replace('p','') + ' · exercícios</span>' +
      '<h1>Exercícios</h1>' +
      '<p>Responda direto na página: tokenização, expressões regulares e questões objetivas são corrigidas automaticamente. As discursivas mostram o gabarito para você comparar.</p>' +
    '</div>' +
    '<div class="stats" id="statsBox"></div>' +
    '<div class="ex-switch">' +
      '<button data-tab="orig" class="' + (tab==='orig'?'on':'') + '">' +
        '<span class="t">📘 Originais do material <span class="badge-src">material oficial</span></span>' +
        '<span class="d">Exatamente os Exemplos 1 a 4 dos slides, com correção e gabarito comentado. ' + nOrig + ' questões.</span>' +
      '</button>' +
      '<button data-tab="ia" class="ai ' + (tab==='ia'?'on':'') + '">' +
        '<span class="t">🤖 Gerados por IA <span class="badge-ai">feito por IA</span></span>' +
        '<span class="d">Treino extra criado por IA a partir dos capítulos — não faz parte do material da disciplina. ' + nIA + ' questões.</span>' +
      '</button>' +
    '</div>' +
    (tab === 'ia'
      ? '<div class="ai-banner"><span class="big">🤖</span><div><b>Estes exercícios foram gerados por inteligência artificial.</b><br>' +
        'Eles <u>não</u> saíram dos slides do professor e podem conter erros ou interpretações diferentes das dele. ' +
        'Use como treino extra e, em caso de divergência, o material oficial sempre vence. ' +
        'Para as questões do material, use a aba <b>Originais</b>.</div></div>'
      : '') +
    grupos.map(renderGrupo).join('');

  qsa('.ex-switch button', root).forEach(b => b.onclick = () => {
    DB.d.exTab = b.dataset.tab; DB.save(); renderExercicios(root, prova);
  });

  qsa('[data-ex]', root).forEach(node => {
    const it = EX_INDEX[node.dataset.ex];
    (INIT[it.tipo] || function(){})(node, it);
  });

  atualizarStats();
}

function renderGrupo(g){
  const ia = !!(g.itens.length && g.itens[0].__ia);
  return '<section class="grupo' + (ia ? ' ia' : '') + '">' +
      '<header class="grupo-head">' +
        '<div class="grupo-tt">' +
          '<h2>' + esc(g.grupo) + '</h2>' +
          (ia ? '<span class="badge-ai">🤖 gerado por IA</span>' : '<span class="badge-src">material oficial</span>') +
        '</div>' +
        '<p class="grupo-fonte">' + esc(g.fonte) + '</p>' +
        '<p class="grupo-en">' + g.enunciado + '</p>' +
      '</header>' +
      '<div class="grupo-itens">' + g.itens.map(renderItem).join('') + '</div>' +
    '</section>';
}

function renderItem(it){
  const st = DB.get(it.id).st || '';
  const corpo = (BODY[it.tipo] || (()=>''))(it);
  return '<div class="ex ' + st + (it.__ia ? ' is-ai' : '') + '" data-ex="' + it.id + '">' +
    '<div class="ex-head">' +
      '<span class="status-dot ' + st + '"></span>' +
      '<div class="tt">' + it.titulo + (it.enunciado ? '<small>' + it.enunciado + '</small>' : '') + '</div>' +
      (it.__ia ? '<span class="badge-ai">🤖 IA</span>' : '') +
    '</div>' +
    '<div class="ex-body">' + corpo + '<div class="fb" hidden></div></div>' +
  '</div>';
}

/* =============================================================
   CORPOS
   ============================================================= */
const BODY = {};
const INIT = {};

/* ----------------- TOKENIZE ----------------- */
BODY.tokenize = it =>
  '<div class="tok-code">' + it.tokens.map((t,i) => t.br
    ? '<span class="tok-break"></span>'
    : '<span class="tok" data-i="' + i + '"><span class="lx">' + esc(t.lex) + '</span>' +
      '<select aria-label="classe de ' + esc(t.lex) + '"><option value="">?</option>' +
      CLASSES_TOKEN.map(c => '<option value="' + c + '">' + c + '</option>').join('') + '</select></span>'
  ).join('') + '</div>' +
  '<div class="legend"><span><b>ID</b> identificador</span><span><b>KW</b> palavra-chave</span><span><b>LT</b> literal</span><span><b>SP</b> separador</span><span><b>OP</b> operador</span></div>' +
  (it.dica ? '<div class="note" style="font-size:13px">💡 ' + it.dica + '</div>' : '') +
  '<div class="actions"><button class="btn primary" data-act="check">Corrigir</button>' +
  '<button class="btn" data-act="gab">Mostrar gabarito</button>' +
  '<button class="btn ghost" data-act="clear">Limpar</button></div>';

INIT.tokenize = (node, it) => {
  const sels = qsa('.tok select', node);
  const salvos = DB.get(it.id).ans || [];
  sels.forEach((s,i) => { if(salvos[i]) s.value = salvos[i]; });
  const idxs = qsa('.tok', node).map(t => +t.dataset.i);

  const salvar = () => DB.set(it.id, {ans: sels.map(s => s.value)});
  sels.forEach(s => s.onchange = salvar);

  const notas = it.notas ? '<div class="gab"><b>Observações:</b><ul>' + it.notas.map(n => '<li>' + n + '</li>').join('') + '</ul></div>' : '';

  qs('[data-act=check]', node).onclick = () => {
    let acertos = 0, vazios = 0;
    sels.forEach((s,k) => {
      const certo = it.tokens[idxs[k]].cls;
      const tok = s.closest('.tok');
      tok.classList.remove('ok','bad');
      if(!s.value){ vazios++; return; }
      if(s.value === certo){ acertos++; tok.classList.add('ok'); } else { tok.classList.add('bad'); }
    });
    salvar();
    const total = sels.length;
    fb(node, acertos===total ? 'ok' : 'bad',
      placar(acertos, total) +
      (vazios ? '<p style="margin:0">Faltou classificar <b>' + vazios + '</b> lexema(s).</p>' : '') +
      (acertos === total
        ? '<p style="margin:6px 0 0">Todos os lexemas foram classificados corretamente.</p>'
        : '<p style="margin:6px 0 0">Os lexemas em <span style="color:var(--err)">vermelho</span> estão na classe errada. Corrija e clique em Corrigir de novo.</p>') + notas);
    setStatus(node, acertos===total ? 'ok' : 'bad');
  };

  qs('[data-act=gab]', node).onclick = () => {
    sels.forEach((s,k) => { s.value = it.tokens[idxs[k]].cls; s.closest('.tok').classList.add('ok'); });
    salvar();
    fb(node, '', '<h6>📖 Gabarito preenchido</h6>' + notas);
    if(!DB.get(it.id).st) setStatus(node, 'part');
  };

  qs('[data-act=clear]', node).onclick = () => {
    sels.forEach(s => { s.value=''; s.closest('.tok').classList.remove('ok','bad'); });
    qs('.fb', node).hidden = true; DB.set(it.id, {ans:[], st:''}); setStatus(node, '');
  };
};

/* ----------------- REGEX ----------------- */
BODY.regex = it =>
  (it.dica ? '<div class="note" style="font-size:13px">💡 ' + it.dica + '</div>' : '') +
  '<div class="rx-field"><span class="slash">/</span><input type="text" class="mono" data-in placeholder="sua expressão regular" spellcheck="false"><span class="slash r">/</span></div>' +
  '<div class="actions"><button class="btn primary" data-act="check">Testar</button>' +
  '<button class="btn" data-act="gab">Ver gabarito</button>' +
  '<button class="btn ghost" data-act="lab">Abrir no Regex Lab ↗</button></div>' +
  '<div class="tests" data-tests></div>';

INIT.regex = (node, it) => {
  const inp = qs('[data-in]', node);
  inp.value = DB.get(it.id).ans || '';

  const casos = it.aceita.map(s => ({s, esperado:true})).concat(it.rejeita.map(s => ({s, esperado:false})));

  function testar(expr, silencioso){
    let re;
    try { re = reAncorada(expr); }
    catch(e){
      qs('[data-tests]', node).innerHTML = '';
      fb(node, 'bad', '<h6>⚠️ Expressão inválida</h6><code>' + esc(e.message) + '</code>');
      if(!silencioso) setStatus(node, 'bad');
      return;
    }
    let acertos = 0;
    const linhas = casos.map(c => {
      const casou = re.test(c.s);
      const ok = casou === c.esperado;
      if(ok) acertos++;
      return '<div class="tcase ' + (ok?'pass':'fail') + '"><span class="ic">' + (ok?'✓':'✕') + '</span>' +
             '<span>' + vazioTxt(c.s) + '</span>' +
             '<span class="exp">' + (c.esperado?'deve casar':'não deve casar') + '</span></div>';
    }).join('');
    qs('[data-tests]', node).innerHTML = linhas;
    const total = casos.length;
    fb(node, acertos===total ? 'ok' : 'bad',
      placar(acertos, total) +
      (acertos===total
        ? '<p style="margin:0">Sua expressão passou em todos os casos de teste.</p>'
        : '<p style="margin:0">Veja acima quais casos falharam. Lembre que o teste é <b>ancorado</b>: a expressão precisa casar a string inteira.</p>'));
    if(!silencioso) setStatus(node, acertos===total ? 'ok' : 'bad');
  }

  qs('[data-act=check]', node).onclick = () => {
    const v = inp.value.trim();
    DB.set(it.id, {ans:v});
    if(!v){ fb(node, 'bad', '<h6>Escreva uma expressão primeiro 🙂</h6>'); return; }
    testar(v);
  };
  inp.addEventListener('keydown', e => { if(e.key === 'Enter') qs('[data-act=check]', node).click(); });

  qs('[data-act=gab]', node).onclick = () => {
    const alts = (it.alt||[]).length ? '<p style="margin:8px 0 0">Também valem: ' + it.alt.map(a => '<code>' + esc(a) + '</code>').join(' · ') + '</p>' : '';
    fb(node, '', '<h6>📖 Gabarito</h6><pre style="margin:0"><code>' + esc(it.gabarito) + '</code></pre>' + alts +
      '<p class="muted" style="margin:8px 0 0;font-size:12.5px">Qualquer expressão que passe em todos os testes é considerada correta.</p>');
    if(!DB.get(it.id).st) setStatus(node, 'part');
  };

  qs('[data-act=lab]', node).onclick = () => {
    RX_PREFILL = { re: inp.value.trim() || it.gabarito, txt: casos.map(c => c.s).join('\n') };
    location.hash = '#/regex';
  };
};

/* ----------------- OPEN (discursiva) ----------------- */
BODY.open = it =>
  '<textarea rows="5" data-in placeholder="Escreva sua resposta com suas palavras…"></textarea>' +
  '<div class="actions"><button class="btn primary" data-act="check">Corrigir</button>' +
  '<button class="btn" data-act="gab">Ver gabarito</button></div>';

INIT.open = (node, it) => {
  const ta = qs('[data-in]', node);
  ta.value = DB.get(it.id).ans || '';
  ta.onchange = () => DB.set(it.id, {ans: ta.value});

  const gabHtml = '<div class="gab"><b>📖 Gabarito:</b><p style="margin:6px 0 0">' + it.gabarito + '</p></div>' +
    '<div class="actions"><span class="muted" style="font-size:12.5px">Como você foi?</span>' +
    '<button class="btn sm" data-mark="ok">✅ Acertei</button>' +
    '<button class="btn sm" data-mark="part">🤏 Parcialmente</button>' +
    '<button class="btn sm" data-mark="bad">❌ Errei</button></div>';

  function ligarMarcadores(){
    qsa('[data-mark]', node).forEach(b => b.onclick = () => {
      setStatus(node, b.dataset.mark);
      fb(node, b.dataset.mark==='ok'?'ok':(b.dataset.mark==='bad'?'bad':''), qs('.fb', node).innerHTML.replace(/<div class="actions">[\s\S]*$/, '') +
        '<p style="margin:10px 0 0" class="muted">Anotado: <b>' + ({ok:'acertei',part:'parcialmente',bad:'errei'})[b.dataset.mark] + '</b>.</p>');
    });
  }

  qs('[data-act=check]', node).onclick = () => {
    const txt = norm(ta.value);
    DB.set(it.id, {ans: ta.value});
    if(!txt.trim()){ fb(node, 'bad', '<h6>Escreva sua resposta antes de corrigir 🙂</h6>'); return; }
    const chaves = it.chaves || [];
    const achou = chaves.map(c => ({k:c.k, hit: c.syn.some(s => txt.indexOf(norm(s)) >= 0)}));
    const n = achou.filter(a => a.hit).length;
    fb(node, n === chaves.length ? 'ok' : '',
      '<h6>🔍 Análise da sua resposta <span class="chip">' + n + '/' + chaves.length + ' pontos-chave</span></h6>' +
      '<p class="muted" style="margin:0 0 6px;font-size:12.5px">A checagem procura os conceitos esperados no seu texto — é um apoio, não uma nota. A palavra final é sua, comparando com o gabarito.</p>' +
      '<ul>' + achou.map(a => '<li>' + (a.hit ? '✅' : '⬜') + ' ' + esc(a.k) + '</li>').join('') + '</ul>' + gabHtml);
    ligarMarcadores();
  };

  qs('[data-act=gab]', node).onclick = () => {
    DB.set(it.id, {ans: ta.value});
    fb(node, '', '<h6>📖 Gabarito</h6><p style="margin:0">' + it.gabarito + '</p>' +
      '<div class="actions"><span class="muted" style="font-size:12.5px">Como você foi?</span>' +
      '<button class="btn sm" data-mark="ok">✅ Acertei</button>' +
      '<button class="btn sm" data-mark="part">🤏 Parcialmente</button>' +
      '<button class="btn sm" data-mark="bad">❌ Errei</button></div>');
    ligarMarcadores();
  };
};

/* ----------------- MÚLTIPLA ESCOLHA ----------------- */
BODY.mc = it =>
  '<div class="opts">' + it.opcoes.map((o,i) =>
    '<label class="opt" data-i="' + i + '"><input type="radio" name="' + it.id + '" value="' + i + '">' +
    '<span class="k">' + String.fromCharCode(97+i) + ')</span><span>' + o + '</span></label>').join('') + '</div>' +
  '<div class="actions"><button class="btn primary" data-act="check">Responder</button></div>';

INIT.mc = (node, it) => {
  const salvo = DB.get(it.id).ans;
  if(salvo != null){ const r = qs('input[value="' + salvo + '"]', node); if(r) r.checked = true; }
  qs('[data-act=check]', node).onclick = () => {
    const sel = qs('input:checked', node);
    if(!sel){ fb(node, 'bad', '<h6>Escolha uma alternativa 🙂</h6>'); return; }
    const i = +sel.value, ok = i === it.correta;
    DB.set(it.id, {ans:i});
    qsa('.opt', node).forEach(l => {
      l.classList.remove('right','wrong');
      if(+l.dataset.i === it.correta) l.classList.add('right');
      else if(+l.dataset.i === i) l.classList.add('wrong');
    });
    fb(node, ok?'ok':'bad', '<h6>' + (ok?'✅ Correto!':'❌ Não é essa') + '</h6><p style="margin:0">' + it.just + '</p>');
    setStatus(node, ok?'ok':'bad');
  };
};

/* ----------------- MÚLTIPLA RESPOSTA ----------------- */
BODY.multi = it =>
  '<div class="opts">' + it.opcoes.map((o,i) =>
    '<label class="opt" data-i="' + i + '"><input type="checkbox" value="' + i + '">' +
    '<span class="k">' + String.fromCharCode(97+i) + ')</span><span>' + o + '</span></label>').join('') + '</div>' +
  '<div class="actions"><button class="btn primary" data-act="check">Responder</button></div>';

INIT.multi = (node, it) => {
  (DB.get(it.id).ans || []).forEach(i => { const c = qs('input[value="' + i + '"]', node); if(c) c.checked = true; });
  qs('[data-act=check]', node).onclick = () => {
    const marc = qsa('input:checked', node).map(c => +c.value);
    DB.set(it.id, {ans:marc});
    const certa = it.correta;
    const ok = marc.length === certa.length && marc.every(i => certa.indexOf(i) >= 0);
    qsa('.opt', node).forEach(l => {
      const i = +l.dataset.i;
      l.classList.remove('right','wrong');
      if(certa.indexOf(i) >= 0) l.classList.add('right');
      else if(marc.indexOf(i) >= 0) l.classList.add('wrong');
    });
    fb(node, ok?'ok':'bad', '<h6>' + (ok?'✅ Correto!':'❌ Faltou ou sobrou alguma') + '</h6><p style="margin:0">' + it.just + '</p>');
    setStatus(node, ok?'ok':'bad');
  };
};

/* ----------------- VERDADEIRO / FALSO ----------------- */
BODY.tf = it =>
  '<div class="opts">' + it.itens.map((s,i) =>
    '<div class="opt" data-i="' + i + '" style="cursor:default;align-items:center">' +
      '<span style="flex:1">' + s.s + '</span>' +
      '<span style="display:flex;gap:6px;flex:0 0 auto">' +
        '<label style="display:flex;gap:4px;align-items:center;cursor:pointer;font-weight:700"><input type="radio" name="' + it.id + '-' + i + '" value="v">V</label>' +
        '<label style="display:flex;gap:4px;align-items:center;cursor:pointer;font-weight:700"><input type="radio" name="' + it.id + '-' + i + '" value="f">F</label>' +
      '</span></div>').join('') + '</div>' +
  '<div class="actions"><button class="btn primary" data-act="check">Responder</button></div>';

INIT.tf = (node, it) => {
  const salvo = DB.get(it.id).ans || {};
  Object.keys(salvo).forEach(i => { const r = qs('input[name="' + it.id + '-' + i + '"][value="' + salvo[i] + '"]', node); if(r) r.checked = true; });

  qs('[data-act=check]', node).onclick = () => {
    const resp = {}; let acertos = 0, respondidas = 0;
    it.itens.forEach((s,i) => {
      const r = qs('input[name="' + it.id + '-' + i + '"]:checked', node);
      const linha = qs('.opt[data-i="' + i + '"]', node);
      linha.classList.remove('right','wrong');
      if(!r) return;
      respondidas++;
      resp[i] = r.value;
      const acertou = (r.value === 'v') === s.v;
      if(acertou){ acertos++; linha.classList.add('right'); } else linha.classList.add('wrong');
    });
    DB.set(it.id, {ans:resp});
    const total = it.itens.length;
    fb(node, acertos===total ? 'ok':'bad',
      placar(acertos, total) +
      (respondidas < total ? '<p style="margin:0 0 6px">Faltaram <b>' + (total-respondidas) + '</b> afirmações.</p>' : '') +
      '<ul>' + it.itens.map(s => '<li><b>' + (s.v?'V':'F') + '</b> — ' + s.just + '</li>').join('') + '</ul>');
    setStatus(node, acertos===total ? 'ok':'bad');
  };
};

/* ----------------- ORDENAR ----------------- */
BODY.order = it => '<div class="order" data-order></div>' +
  '<div class="actions"><button class="btn primary" data-act="check">Conferir ordem</button>' +
  '<button class="btn ghost" data-act="shuffle">Embaralhar</button></div>';

INIT.order = (node, it) => {
  const box = qs('[data-order]', node);
  let ordem = DB.get(it.id).ans;
  if(!ordem || ordem.length !== it.itens.length) ordem = shuffle(it.itens.map((_,i)=>i));

  function pintar(){
    box.innerHTML = ordem.map((idx,pos) =>
      '<div class="oitem" data-pos="' + pos + '"><span class="idx">' + (pos+1) + '.</span>' +
      '<span>' + esc(it.itens[idx]) + '</span>' +
      '<span class="mv"><button class="btn sm" data-mv="-1"' + (pos===0?' disabled':'') + '>↑</button>' +
      '<button class="btn sm" data-mv="1"' + (pos===ordem.length-1?' disabled':'') + '>↓</button></span></div>').join('');
    qsa('[data-mv]', box).forEach(b => b.onclick = () => {
      const pos = +b.closest('.oitem').dataset.pos, d = +b.dataset.mv, alvo = pos + d;
      [ordem[pos], ordem[alvo]] = [ordem[alvo], ordem[pos]];
      DB.set(it.id, {ans:ordem}); pintar();
    });
  }
  pintar();

  qs('[data-act=shuffle]', node).onclick = () => { ordem = shuffle(ordem); DB.set(it.id,{ans:ordem}); pintar(); };
  qs('[data-act=check]', node).onclick = () => {
    let acertos = 0;
    qsa('.oitem', box).forEach((li,pos) => {
      const ok = ordem[pos] === pos;
      li.classList.toggle('right', ok); li.classList.toggle('wrong', !ok);
      if(ok) acertos++;
    });
    const total = it.itens.length;
    fb(node, acertos===total?'ok':'bad',
      placar(acertos, total) +
      '<p style="margin:0">' + it.just + '</p>' +
      '<div class="gab"><b>Ordem correta:</b><ol style="margin:6px 0 0">' + it.itens.map(x => '<li>' + esc(x) + '</li>').join('') + '</ol></div>');
    setStatus(node, acertos===total?'ok':'bad');
  };
};

/* ----------------- ACEITA / REJEITA ----------------- */
BODY.accept = it =>
  '<div class="opts">' + it.strings.map((s,i) =>
    '<div class="opt" data-i="' + i + '" style="cursor:default;align-items:center">' +
      '<code style="flex:1">' + vazioTxt(s.s) + '</code>' +
      '<span style="display:flex;gap:10px;flex:0 0 auto;font-size:12.5px">' +
        '<label style="display:flex;gap:4px;align-items:center;cursor:pointer"><input type="radio" name="' + it.id + '-' + i + '" value="a">aceita</label>' +
        '<label style="display:flex;gap:4px;align-items:center;cursor:pointer"><input type="radio" name="' + it.id + '-' + i + '" value="r">rejeita</label>' +
      '</span></div>').join('') + '</div>' +
  '<div class="actions"><button class="btn primary" data-act="check">Responder</button></div>';

INIT.accept = (node, it) => {
  const salvo = DB.get(it.id).ans || {};
  Object.keys(salvo).forEach(i => { const r = qs('input[name="' + it.id + '-' + i + '"][value="' + salvo[i] + '"]', node); if(r) r.checked = true; });

  qs('[data-act=check]', node).onclick = () => {
    const resp = {}; let acertos = 0;
    it.strings.forEach((s,i) => {
      const r = qs('input[name="' + it.id + '-' + i + '"]:checked', node);
      const linha = qs('.opt[data-i="' + i + '"]', node);
      linha.classList.remove('right','wrong');
      if(!r) return;
      resp[i] = r.value;
      const acertou = (r.value === 'a') === s.ok;
      if(acertou){ acertos++; linha.classList.add('right'); } else linha.classList.add('wrong');
    });
    DB.set(it.id, {ans:resp});
    const total = it.strings.length;
    fb(node, acertos===total?'ok':'bad',
      placar(acertos, total) + '<p style="margin:0">' + it.just + '</p>' +
      '<div class="gab"><b>Respostas:</b> ' + it.strings.map(s => (s.s===''?'(vazia)':'<code>'+esc(s.s)+'</code>') + ' → ' + (s.ok?'aceita':'rejeita')).join(' · ') + '</div>');
    setStatus(node, acertos===total?'ok':'bad');
  };
};

/* =============================================================
   ESTATÍSTICAS
   ============================================================= */
function atualizarStats(){
  const box = qs('#statsBox');
  if(!box) return;
  const prova = DB.d.prova;
  const conta = src => {
    const itens = (src[prova]||[]).reduce((a,g)=>a.concat(g.itens),[]);
    const ok = itens.filter(i => DB.get(i.id).st === 'ok').length;
    const bad = itens.filter(i => DB.get(i.id).st === 'bad').length;
    return {t:itens.length, ok, bad};
  };
  const o = conta(EX_ORIGINAIS), a = conta(EX_IA);
  const tot = o.t + a.t, ok = o.ok + a.ok, bad = o.bad + a.bad;
  const pct = tot ? Math.round(100*ok/tot) : 0;

  box.innerHTML =
    '<div class="stat"><div class="v">' + ok + '<span style="font-size:14px;color:var(--muted)">/' + tot + '</span></div>' +
      '<div class="l">acertadas</div><div class="bar"><i style="width:' + pct + '%"></i></div></div>' +
    '<div class="stat"><div class="v" style="color:var(--err)">' + bad + '</div><div class="l">para revisar</div></div>' +
    '<div class="stat"><div class="v">' + o.ok + '<span style="font-size:14px;color:var(--muted)">/' + o.t + '</span></div><div class="l">📘 do material</div></div>' +
    '<div class="stat"><div class="v">' + a.ok + '<span style="font-size:14px;color:var(--muted)">/' + a.t + '</span></div><div class="l">🤖 da IA</div></div>' +
    '<div class="stat" style="display:flex;align-items:center;justify-content:center">' +
      '<button class="btn sm ghost" id="resetBtn">↺ Reiniciar progresso</button></div>';

  const rb = qs('#resetBtn');
  if(rb) rb.onclick = () => {
    if(confirm('Isso apaga suas respostas e o progresso salvo neste navegador. Continuar?')){
      DB.reset(); renderExercicios(qs('#view-exercicios'), DB.d.prova); atualizarProgressoGlobal();
    }
  };
}
