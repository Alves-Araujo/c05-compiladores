/* =============================================================
   TUTOR — painel de dúvidas fixo à direita (aba Matéria)
   Dois modos:
   1) MATERIAL (padrão, sem configurar nada) — responde com os
      trechos do próprio material, com link para a seção.
   2) IA — conversa de verdade com o Claude usando SUA chave de
      API. O site é estático: não há servidor nem chave embutida,
      então a chamada sai do seu navegador direto para a API e a
      chave fica só no localStorage desta máquina.
   Sem SDK: o projeto é JS puro sem bundler, então falamos HTTP
   direto com a Messages API.
   ============================================================= */

const API_URL = 'https://api.anthropic.com/v1/messages';
const API_VER = '2023-06-01';
const BETA_FB = 'server-side-fallback-2026-07-01';
const MODELOS = [
  ['claude-opus-5',    'Opus 5 — o mais capaz'],
  ['claude-sonnet-5',  'Sonnet 5 — equilibrado'],
  ['claude-haiku-4-5', 'Haiku 4.5 — o mais barato']
];

const SISTEMA =
  'Você é o tutor da disciplina C05 — Linguagens de Programação e Compiladores, do Inatel.\n' +
  'Responda SEMPRE em português do Brasil, de forma direta e didática, no nível de um aluno de graduação.\n' +
  'Baseie-se no material da disciplina fornecido abaixo. Quando citar algo, diga a seção (ex.: "§1.3.5").\n' +
  'Se a pergunta for sobre algo que o material não cobre, diga isso claramente e só então complemente com ' +
  'conhecimento geral, deixando explícito que aquela parte não está no material.\n' +
  'Prefira respostas curtas e bem estruturadas. Use listas e exemplos quando ajudar. ' +
  'Para expressões regulares, mostre a expressão em bloco de código.\n' +
  'Não invente conteúdo que não esteja no material e não finja que o professor disse algo que não está lá.';

let CHAT_MSGS = [];
let CHAT_OCUPADO = false;

/* ---------- material completo como contexto ---------- */
function materialCompleto(prova){
  return construirIndice(prova)
    .filter(e => e.tipo === 'Matéria' || e.tipo === 'Formulário')
    .map(e => '## ' + e.rotulo + '\n' + e.texto)
    .join('\n\n');
}

/* ---------- markdown minimalista (seguro: escapa antes) ---------- */
function md(t){
  let s = esc(t);
  const blocos = [];
  s = s.replace(/```(\w*)\n?([\s\S]*?)```/g, function(m, l, c){
    blocos.push('<pre><code>' + c.replace(/\n$/, '') + '</code></pre>');
    return '%%BLOCO' + (blocos.length - 1) + '%%';
  });
  s = s.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>');
  s = s.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<i>$2</i>');
  s = s.replace(/^###?\s+(.+)$/gm, '<b class="md-h">$1</b>');
  s = s.replace(/^\s*[-*]\s+(.+)$/gm, '<li>$1</li>');
  s = s.replace(/^\s*(\d+)\.\s+(.+)$/gm, '<li><span class="md-n">$1.</span> $2</li>');
  s = s.replace(/(<li>[\s\S]*?<\/li>)(?!\s*<li>)/g, '<ul>$1</ul>');
  s = s.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>');
  s = '<p>' + s + '</p>';
  // as listas não podem ficar dentro de <p>, e o <br> ao redor delas sobra
  s = s.replace(/<br>\s*(<\/?(?:ul|li))/g, '$1').replace(/(<\/(?:li|ul)>)\s*<br>/g, '$1');
  s = s.replace(/<ul>/g, '</p><ul>').replace(/<\/ul>/g, '</ul><p>');
  s = s.replace(/<p>\s*<\/p>/g, '');
  s = s.replace(/%%BLOCO(\d+)%%/g, function(m, i){ return blocos[+i]; });
  s = s.replace(/<p>\s*(<pre>[\s\S]*?<\/pre>)\s*<\/p>/g, '$1');
  return s.replace(/<br>\s*(<pre>)/g, '$1').replace(/(<\/pre>)\s*<br>/g, '$1');
}

/* ---------- estado ---------- */
function chatCfg(){
  const c = DB.d.chatCfg || {};
  return {chave: c.chave || '', modelo: c.modelo || MODELOS[0][0]};
}
function salvarCfg(o){ DB.d.chatCfg = Object.assign({}, chatCfg(), o); DB.save(); atualizarModo(); }
function temChave(){ return !!chatCfg().chave.trim(); }

function atualizarModo(){
  const b = qs('#chatModo');
  if(!b) return;
  const ia = temChave();
  b.textContent = ia ? '🤖 modo IA' : '📚 modo material';
  b.className = 'chat-modo' + (ia ? ' ia' : '');
  b.title = ia
    ? 'Respondendo com o Claude usando sua chave de API, com o material da ' + DB.d.prova.toUpperCase() + ' no contexto.'
    : 'Sem chave configurada: respondo com trechos do próprio material. Clique na engrenagem para ligar a IA.';
}

/* ---------- render ---------- */
function pintarChat(){
  const box = qs('#chatMsgs');
  if(!box) return;

  if(!CHAT_MSGS.length){
    box.innerHTML =
      '<div class="chat-boas">' +
        '<div class="big">😼</div>' +
        '<b>Tire suas dúvidas da matéria</b>' +
        '<p>Pergunte à vontade sobre os capítulos da ' + DB.d.prova.toUpperCase() + '. ' +
        'Sem configurar nada, eu respondo com os <b>trechos do próprio material</b>. ' +
        'Ligando a IA na engrenagem, você conversa com o Claude — que recebe a matéria inteira junto com a sua pergunta.</p>' +
        '<div class="chat-sug">' +
          ['Qual a diferença entre lexema e token?', 'Por que o interpretador é mais lento?',
           'Explique a coerção com um exemplo', 'O que é ortogonalidade?']
            .map(function(t){ return '<button data-cs="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') +
        '</div>' +
      '</div>';
    qsa('[data-cs]', box).forEach(function(b){
      b.onclick = function(){ qs('#chatQ').value = b.dataset.cs; enviarChat(); };
    });
    return;
  }

  box.innerHTML = CHAT_MSGS.map(function(m, i){
    if(m.role === 'user') return '<div class="msg eu">' + esc(m.text) + '</div>';
    return '<div class="msg bot' + (m.pendente ? ' pend' : '') + '">' +
      (m.fonte === 'material' ? '<span class="msg-tag">📚 do material</span>' : '') +
      (m.fonte === 'ia' ? '<span class="msg-tag ia">🤖 ' + esc(m.modelo || 'Claude') + '</span>' : '') +
      (m.erro ? '<div class="msg-erro">' + esc(m.text) + '</div>' : md(m.text || '…')) +
      (m.links && m.links.length
        ? '<div class="msg-links">' + m.links.map(function(l, j){
            return '<button data-msg="' + i + '" data-link="' + j + '">↗ ' + esc(l.rotulo) + '</button>';
          }).join('') + '</div>'
        : '') +
    '</div>';
  }).join('');

  qsa('[data-link]', box).forEach(function(b){
    b.onclick = function(){
      const m = CHAT_MSGS[+b.dataset.msg];
      irPara(m.links[+b.dataset.link].alvo);
    };
  });
  box.scrollTop = box.scrollHeight;
}

function salvarHistorico(){
  DB.d.chatMsgs = CHAT_MSGS.slice(-40).map(function(m){
    return {role: m.role, text: m.text, fonte: m.fonte, modelo: m.modelo, erro: m.erro};
  });
  DB.save();
}

/* ---------- modo material ---------- */
function responderComMaterial(pergunta){
  const todos = buscar(pergunta, true);
  // no tutor o que serve é explicação; enunciado de exercício só entra se faltar material
  const explicativos = todos.filter(function(r){ return r.e.rota !== 'exercicios'; });
  const res = explicativos.length >= 2 ? explicativos : todos;
  if(!res.length){
    CHAT_MSGS.push({role:'assistant', fonte:'material',
      text:'Não achei nada sobre isso no material da ' + DB.d.prova.toUpperCase() +
           '. Tente outras palavras — ou ligue o modo IA na engrenagem para uma explicação de verdade.'});
    return;
  }
  const topo = res.slice(0, 3);
  const texto = 'Foi isto que encontrei no material:\n\n' +
    topo.map(function(r){
      return '**' + r.e.rotulo + '** *(' + r.e.tipo + ')*\n' + r.e.texto.slice(0, 420).replace(/\n+/g, ' ') + '…';
    }).join('\n\n') +
    '\n\n*Isto é um trecho do material, não uma explicação. Para o Claude explicar com a matéria inteira no contexto, ligue o modo IA na engrenagem.*';
  CHAT_MSGS.push({role:'assistant', fonte:'material', text:texto,
    links: topo.map(function(r){ return {rotulo:r.e.rotulo, alvo:r.e}; })});
}

/* ---------- modo IA ---------- */
async function responderComIA(pergunta){
  const cfg = chatCfg();
  const msg = {role:'assistant', fonte:'ia', modelo:cfg.modelo.replace('claude-', ''), text:'', pendente:true};
  CHAT_MSGS.push(msg);
  pintarChat();

  const historico = CHAT_MSGS
    .filter(function(m){ return !m.erro && !m.pendente && m.fonte !== 'material'; })
    .slice(-8)
    .map(function(m){ return {role:m.role, content:m.text}; });
  historico.push({role:'user', content:pergunta});

  function corpo(comFallback){
    const b = {
      model: cfg.modelo,
      max_tokens: 4000,
      stream: true,
      output_config: {effort: 'low'},
      system: [
        {type:'text', text: SISTEMA},
        {type:'text',
         text: '===== MATERIAL DA DISCIPLINA (' + DB.d.prova.toUpperCase() + ') =====\n' + materialCompleto(DB.d.prova),
         cache_control: {type:'ephemeral'}}
      ],
      messages: historico
    };
    if(comFallback) b.fallbacks = 'default';
    return b;
  }

  function chamar(comFallback){
    const h = {
      'content-type': 'application/json',
      'x-api-key': cfg.chave.trim(),
      'anthropic-version': API_VER,
      'anthropic-dangerous-direct-browser-access': 'true'
    };
    if(comFallback) h['anthropic-beta'] = BETA_FB;
    return fetch(API_URL, {method:'POST', headers:h, body:JSON.stringify(corpo(comFallback))});
  }

  try{
    let r = await chamar(true);
    if(r.status === 400){
      const t = await r.text();
      if(/fallback|beta/i.test(t)) r = await chamar(false);   // ambiente sem o beta: repete sem ele
      else throw new Error(mensagemDeErro(t, 400));
    }
    if(!r.ok) throw new Error(mensagemDeErro(await r.text(), r.status));

    const leitor = r.body.getReader();
    const dec = new TextDecoder();
    let buf = '', parar = null;

    for(;;){
      const passo = await leitor.read();
      if(passo.done) break;
      buf += dec.decode(passo.value, {stream:true});
      const partes = buf.split('\n\n');
      buf = partes.pop();
      for(const parte of partes){
        const linha = parte.split('\n').find(function(l){ return l.indexOf('data:') === 0; });
        if(!linha) continue;
        let ev;
        try{ ev = JSON.parse(linha.slice(5).trim()); }catch(e){ continue; }
        if(ev.type === 'content_block_delta' && ev.delta && ev.delta.type === 'text_delta'){
          msg.text += ev.delta.text;
          pintarChat();
        } else if(ev.type === 'message_delta' && ev.delta){
          parar = ev.delta.stop_reason;
        } else if(ev.type === 'error'){
          throw new Error((ev.error && ev.error.message) || 'erro durante o streaming');
        }
      }
    }

    if(parar === 'refusal'){
      msg.erro = true;
      msg.text = 'O modelo recusou responder a esta mensagem. Tente reformular a pergunta.';
    } else if(!msg.text){
      msg.erro = true;
      msg.text = 'A resposta veio vazia. Tente novamente.';
    }
  } catch(e){
    msg.erro = true;
    msg.text = (e && e.message) ? e.message : String(e);
    if(/failed to fetch|networkerror/i.test(msg.text)){
      msg.text = 'Não consegui falar com a API (rede bloqueada ou CORS). Verifique sua conexão — ou use o botão "Abrir no Claude" da busca.';
    }
  } finally {
    msg.pendente = false;
    pintarChat();
    salvarHistorico();
  }
}

function mensagemDeErro(txt, status){
  let m = txt;
  try{ const j = JSON.parse(txt); m = (j.error && j.error.message) || txt; }catch(e){}
  if(status === 401) return 'Chave de API inválida ou sem permissão (401). Confira a chave nas configurações do painel.';
  if(status === 429) return 'Limite de requisições atingido (429). Espere alguns segundos e tente de novo.';
  if(status === 402 || /credit|balance/i.test(m)) return 'A conta da API está sem créditos. Adicione créditos no console da Anthropic.';
  if(status >= 500) return 'A API está instável agora (' + status + '). Tente novamente em instantes.';
  return 'Erro ' + status + ': ' + m;
}

/* ---------- envio ---------- */
async function enviarChat(){
  if(CHAT_OCUPADO) return;
  const inp = qs('#chatQ');
  const p = inp.value.trim();
  if(!p) return;

  CHAT_OCUPADO = true;
  inp.value = '';
  inp.style.height = 'auto';
  CHAT_MSGS.push({role:'user', text:p});
  pintarChat();

  if(temChave()) await responderComIA(p);
  else { responderComMaterial(p); pintarChat(); }

  salvarHistorico();
  CHAT_OCUPADO = false;
  inp.focus();
}

/* ---------- configurações ---------- */
function abrirConfig(){
  const cfg = chatCfg();
  const box = qs('#chatMsgs');
  box.innerHTML =
    '<div class="chat-cfg">' +
      '<b>Ligar o modo IA</b>' +
      '<p>Este site é estático — não existe servidor nem chave embutida nele. Para conversar com o Claude, ' +
      'use uma chave da <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">sua própria conta</a>. ' +
      'Ela fica salva <b>apenas neste navegador</b> (localStorage) e vai do seu computador direto para a API da Anthropic.</p>' +
      '<label class="cfg-l">Chave de API</label>' +
      '<input type="password" id="cfgChave" class="mono" placeholder="sk-ant-..." autocomplete="off" spellcheck="false">' +
      '<label class="cfg-l">Modelo</label>' +
      '<select id="cfgModelo">' + MODELOS.map(function(m){
        return '<option value="' + m[0] + '"' + (m[0] === cfg.modelo ? ' selected' : '') + '>' + m[1] + '</option>';
      }).join('') + '</select>' +
      '<div class="actions">' +
        '<button class="btn sm primary" id="cfgSalvar">Salvar</button>' +
        '<button class="btn sm" id="cfgVoltar">Voltar</button>' +
        (cfg.chave ? '<button class="btn sm ghost" id="cfgApagar">Apagar chave</button>' : '') +
      '</div>' +
      '<p class="muted" style="font-size:11.5px">Use isto apenas num computador seu. Cada pergunta envia a matéria da prova ' +
      'selecionada (cerca de 6 mil tokens) junto; o cache da API deixa as perguntas seguintes bem mais baratas.</p>' +
    '</div>';

  qs('#cfgChave').value = cfg.chave;
  qs('#cfgSalvar').onclick = function(){
    salvarCfg({chave: qs('#cfgChave').value.trim(), modelo: qs('#cfgModelo').value});
    pintarChat();
  };
  qs('#cfgVoltar').onclick = pintarChat;
  const ap = qs('#cfgApagar');
  if(ap) ap.onclick = function(){ salvarCfg({chave:''}); pintarChat(); };
}

/* ---------- abrir / fechar ---------- */
function chatVisivel(mostrar){
  DB.d.chatAberto = mostrar;
  DB.save();
  qs('#chat').hidden = !mostrar;
  qs('#chatFab').hidden = mostrar;
  document.body.classList.toggle('chat-on', mostrar);
  if(mostrar) setTimeout(function(){ qs('#chatQ').focus(); }, 120);
}

function sincronizarChat(rota){
  const eMateria = rota === 'materia';
  qs('#chatFab').hidden = !eMateria || !!DB.d.chatAberto;
  qs('#chat').hidden = !eMateria || !DB.d.chatAberto;
  document.body.classList.toggle('chat-on', eMateria && !!DB.d.chatAberto);
  if(eMateria) atualizarModo();
}

function initChat(){
  CHAT_MSGS = (DB.d.chatMsgs || []).slice();
  qs('#chatFab').onclick = function(){ chatVisivel(true); };
  qs('#chatFechar').onclick = function(){ chatVisivel(false); };
  qs('#chatCfg').onclick = abrirConfig;
  qs('#chatLimpar').onclick = function(){
    if(!CHAT_MSGS.length || confirm('Apagar esta conversa?')){
      CHAT_MSGS = []; salvarHistorico(); pintarChat();
    }
  };
  qs('#chatEnviar').onclick = enviarChat;

  const inp = qs('#chatQ');
  inp.addEventListener('keydown', function(e){
    if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); enviarChat(); }
  });
  inp.addEventListener('input', function(){
    inp.style.height = 'auto';
    inp.style.height = Math.min(inp.scrollHeight, 130) + 'px';
  });

  pintarChat();
  atualizarModo();
}
