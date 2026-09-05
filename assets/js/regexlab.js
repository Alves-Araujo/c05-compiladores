/* =============================================================
   REGEX LAB — testador de expressões regulares (estilo Rubular)
   Executa a regex num Web Worker com timeout, para que uma
   expressão patológica não trave a página.
   ============================================================= */

let RX_PREFILL = null;

const RX_PRESETS = [
  {n:'Identificador da linguagem C', re:'[a-zA-Z_][a-zA-Z0-9_]*', txt:'x1\n_total\n9nome\nposition\ninitial\nrate\nmeu-nome'},
  {n:'Número sem sinal (Exemplo 4)', re:'[0-9]+([.][0-9]+)?([eE][+-]?[0-9]+)?', txt:'5777\n0.099\n3.14E4\n1.5E-4\n.5\n5.\nabc'},
  {n:'CEP brasileiro', re:'[0-9]{5}-[0-9]{3}', txt:'37540-000\n01310-100\n3754-000\n37540000'},
  {n:'E-mail Gmail ou Yahoo', re:'[a-zA-Z0-9._%+-]+@(gmail|yahoo)[.]com', txt:'jotc@gmail.com\njotc@yahoo.com\njotc@hotmail.com'},
  {n:'Hora em 24h', re:'([01][0-9]|2[0-3]):[0-5][0-9]', txt:'19:30\n00:00\n23:59\n24:00\n19:60'},
  {n:'Palavras só com vogais', re:'\\b[aeiou]+\\b', txt:'uai\naeiou\ncasa\noi\nxyz'},
  {n:'Tokens de um comando', re:'[a-zA-Z_][a-zA-Z0-9_]*|[0-9]+|[=+*/-]', txt:'position = initial + rate * 60'}
];

const RX_REF = [
  ['.','qualquer caractere'],['\\d','dígito'],['\\w','letra, dígito ou _'],['\\s','espaço em branco'],
  ['\\D \\W \\S','o inverso dos de cima'],['[abc]','a, b ou c'],['[^abc]','qualquer um menos a, b, c'],
  ['[a-z]','intervalo'],['a|b','a ou b'],['(…)','grupo de captura'],['(?:…)','grupo sem captura'],
  ['(?&lt;n&gt;…)','grupo nomeado'],['a*','zero ou mais'],['a+','uma ou mais'],['a?','zero ou uma'],
  ['a{3}','exatamente 3'],['a{2,4}','de 2 a 4'],['a{2,}','2 ou mais'],['a*?','preguiçoso (mínimo)'],
  ['^ $','início / fim'],['\\b','fronteira de palavra'],['\\.','ponto literal']
];

let RX_WORKER = null, RX_TIMER = null, RX_SEM_WORKER = false;

/* Fonte unica da regra de casamento. Roda como funcao normal na pagina e,
   serializada com toString(), dentro do worker — para nao existirem duas
   copias da mesma logica que possam divergir com o tempo.
   Escrita em ES5 de proposito: o texto dela vai para dentro do Blob. */
function rxCasar(src, flags, txt){
  var re = new RegExp(src, flags.indexOf('g') >= 0 ? flags : flags + 'g');
  var out = [], m, guard = 0;
  while((m = re.exec(txt)) !== null){
    out.push({i:m.index, s:m[0], g:Array.prototype.slice.call(m, 1), gn:m.groups || null});
    if(m[0] === '') re.lastIndex++;
    if(++guard > 5000) break;
    if(flags.indexOf('g') < 0) break;
  }
  return out;
}

function rxExecutar(src, flags, texto, cb){
  const inline = () => {
    try{ cb({ok:true, matches: rxCasar(src, flags, texto)}); }
    catch(e){ cb({ok:false, erro:e.message}); }
  };

  if(typeof Worker === 'undefined' || RX_SEM_WORKER){ inline(); return; }
  try{
    if(!RX_WORKER){
      const code = rxCasar.toString() +
        ';onmessage=function(e){var d=e.data;try{' +
        'postMessage({ok:true,matches:rxCasar(d.src,d.flags,d.txt)});' +
        '}catch(err){postMessage({ok:false,erro:err.message});}}';
      RX_WORKER = new Worker(URL.createObjectURL(new Blob([code], {type:'application/javascript'})));
    }
    clearTimeout(RX_TIMER);
    RX_WORKER.onmessage = e => { clearTimeout(RX_TIMER); cb(e.data); };
    // Falha de worker e assincrona (ex.: blob: bloqueado em file://). Sem isto
    // nenhuma resposta chega e o timeout culpa a regex do usuario por engano.
    RX_WORKER.onerror = () => {
      clearTimeout(RX_TIMER);
      try{ RX_WORKER.terminate(); }catch(_){}
      RX_WORKER = null; RX_SEM_WORKER = true;
      inline();
    };
    RX_TIMER = setTimeout(() => {
      if(RX_WORKER){ RX_WORKER.terminate(); } RX_WORKER = null;
      cb({ok:false, erro:'A expressão demorou demais para ser avaliada (possível backtracking catastrófico). Simplifique-a.'});
    }, 1500);
    RX_WORKER.postMessage({src, flags, txt:texto});
  }catch(e){ inline(); }
}

function renderRegexLab(root){
  const salvo = DB.d.rx || {};
  const pre = RX_PREFILL; RX_PREFILL = null;

  root.innerHTML =
    '<div class="page-head">' +
      '<span class="eyebrow">🔎 Laboratório</span>' +
      '<h1>Regex Lab</h1>' +
      '<p>Escreva a expressão, cole o texto de teste e veja os casamentos destacados na hora — como o Rubular, mas sem sair do caderno. Tudo roda no seu navegador.</p>' +
    '</div>' +
    '<div class="rx-grid"><div>' +
      '<div class="card">' +
        '<label class="code-label">sua expressão regular</label>' +
        '<div class="rx-field"><span class="slash">/</span>' +
        '<input type="text" id="rxRe" class="mono" spellcheck="false" placeholder="[a-z]+[0-9]{2}">' +
        '<span class="slash r">/</span></div>' +
        '<div class="rx-flags">' +
          ['g|global — todas as ocorrências','i|ignore case — ignora maiúsc./minúsc.','m|multiline — ^ e $ por linha','s|dotall — o . também casa \\n','u|unicode'].map(f => {
            const [k,d] = f.split('|');
            return '<label title="' + esc(d) + '"><input type="checkbox" data-flag="' + k + '">' + k + '</label>';
          }).join('') +
        '</div>' +
        '<div class="rx-status" id="rxStatus"></div>' +
        '<label class="code-label">texto de teste</label>' +
        '<textarea id="rxTxt" rows="7" class="mono" spellcheck="false" placeholder="cole aqui o texto onde a expressão será procurada"></textarea>' +
      '</div>' +
      '<div class="card"><label class="code-label">resultado</label><div class="rx-out" id="rxOut"></div>' +
        '<div id="rxGroups"></div></div>' +
    '</div><div>' +
      '<div class="card"><h4 style="margin:0 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:.07em;color:var(--muted)">Exemplos do material</h4>' +
        '<div class="rx-presets">' + RX_PRESETS.map((p,i) =>
          '<button data-preset="' + i + '">' + esc(p.n) + '<code>' + esc(p.re) + '</code></button>').join('') + '</div></div>' +
      '<div class="card rx-ref"><h4>Referência rápida</h4><div class="tbl-wrap"><table><tbody>' +
        RX_REF.map(r => '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>').join('') +
      '</tbody></table></div>' +
      '<p class="muted" style="font-size:11.5px;margin:10px 0 0">O motor aqui é o do JavaScript. O material usa a notação clássica de compiladores — <code>[.]</code> e <code>\\.</code> funcionam igual para o ponto literal.</p></div>' +
    '</div></div>';

  const inRe = qs('#rxRe'), inTxt = qs('#rxTxt'), out = qs('#rxOut'), grp = qs('#rxGroups'), st = qs('#rxStatus');

  inRe.value  = pre ? pre.re  : (salvo.re  || '');
  inTxt.value = pre ? pre.txt : (salvo.txt != null ? salvo.txt : 'position = initial + rate * 60;\nwhile (i > 1) do i = i - 1;\nx1 != 3\nCEP: 37540-000\njotc@gmail.com');
  const flags = pre ? 'g' : (salvo.flags || 'g');
  qsa('[data-flag]').forEach(c => c.checked = flags.indexOf(c.dataset.flag) >= 0);

  function flagsAtuais(){ return qsa('[data-flag]').filter(c => c.checked).map(c => c.dataset.flag).join(''); }

  function rodar(){
    const src = inRe.value, txt = inTxt.value, fl = flagsAtuais();
    DB.d.rx = {re:src, txt:txt, flags:fl}; DB.save();
    out.classList.remove('rx-err'); grp.innerHTML = '';

    if(!src){ out.textContent = txt; st.innerHTML = '<span class="chip">digite uma expressão para começar</span>'; return; }

    rxExecutar(src, fl, txt, res => {
      if(!res.ok){
        out.classList.add('rx-err');
        out.textContent = '⚠️ ' + res.erro;
        st.innerHTML = '<span class="chip" style="color:var(--err)">expressão inválida</span>';
        return;
      }
      const ms = res.matches;
      st.innerHTML = '<span class="chip">' + ms.length + ' ' + (ms.length===1?'ocorrência':'ocorrências') + '</span>' +
        '<span class="chip">/' + esc(src) + '/' + esc(fl) + '</span>' +
        (ms.length ? '<button class="btn sm ghost" id="rxCopy">copiar link</button>' : '');

      // destaque
      let html = '', pos = 0;
      ms.forEach((m,k) => {
        html += esc(txt.slice(pos, m.i));
        html += '<mark class="m' + (k%2?' alt':'') + (m.s===''?' empty':'') + '">' + (m.s==='' ? '' : esc(m.s)) + '</mark>';
        pos = m.i + m.s.length;
      });
      html += esc(txt.slice(pos));
      out.innerHTML = html || '<span class="muted">(texto vazio)</span>';

      // tabela de grupos
      if(ms.length){
        const temGrupo = ms.some(m => m.g.length);
        grp.innerHTML = '<label class="code-label" style="margin-top:14px">ocorrências</label><div class="tbl-wrap"><table><thead><tr>' +
          '<th>#</th><th>pos.</th><th>casamento</th>' + (temGrupo ? '<th>grupos</th>' : '') + '</tr></thead><tbody>' +
          ms.slice(0,60).map((m,k) => '<tr><td>' + (k+1) + '</td><td><code>' + m.i + '</code></td>' +
            '<td><code>' + (m.s==='' ? '<i class="muted">vazio</i>' : esc(m.s)) + '</code></td>' +
            (temGrupo ? '<td>' + (m.g.length ? m.g.map((g,gi) => '<code>' + (gi+1) + ': ' + (g===undefined?'—':esc(g)) + '</code>').join(' ') : '—') +
              (m.gn ? ' ' + Object.keys(m.gn).map(k2 => '<code>' + esc(k2) + ': ' + esc(m.gn[k2]) + '</code>').join(' ') : '') + '</td>' : '') +
            '</tr>').join('') +
          '</tbody></table></div>' + (ms.length > 60 ? '<p class="muted" style="font-size:12px">mostrando as 60 primeiras de ' + ms.length + '</p>' : '');
      }

      const cp = qs('#rxCopy');
      if(cp) cp.onclick = () => {
        const url = location.origin + location.pathname + '#/regex?re=' + encodeURIComponent(src) + '&f=' + fl;
        navigator.clipboard && navigator.clipboard.writeText(url);
        cp.textContent = 'copiado ✓'; setTimeout(() => cp.textContent = 'copiar link', 1600);
      };
    });
  }

  inRe.addEventListener('input', rodar);
  inTxt.addEventListener('input', rodar);
  qsa('[data-flag]').forEach(c => c.addEventListener('change', rodar));
  qsa('[data-preset]').forEach(b => b.onclick = () => {
    const p = RX_PRESETS[+b.dataset.preset];
    inRe.value = p.re; inTxt.value = p.txt; rodar();
  });

  // aceita #/regex?re=...&f=...
  const q = (location.hash.split('?')[1] || '');
  if(q){
    const par = new URLSearchParams(q);
    if(par.get('re')){ inRe.value = par.get('re'); }
    if(par.get('f')){ qsa('[data-flag]').forEach(c => c.checked = par.get('f').indexOf(c.dataset.flag) >= 0); }
  }
  rodar();
}
