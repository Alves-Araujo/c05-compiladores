/* =============================================================
   APP — roteador, tema, seletor de prova, persistência
   ============================================================= */

const KEY = 'jotc-estudos-v1';

const DB = {
  d:{ prova:'p1', theme:'dark', exTab:'orig', ex:{} },
  load(){ try{ const r=localStorage.getItem(KEY); if(r) Object.assign(this.d, JSON.parse(r)); }catch(e){} },
  save(){ try{ localStorage.setItem(KEY, JSON.stringify(this.d)); }catch(e){} },
  get(id){ return this.d.ex[id] || {}; },
  set(id, o){ this.d.ex[id] = Object.assign({}, this.d.ex[id]||{}, o); this.save(); },
  reset(){ this.d.ex = {}; this.save(); }
};

/* ---------- helpers globais ---------- */
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function norm(s){ return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
function qs(s,r){ return (r||document).querySelector(s); }
function qsa(s,r){ return Array.from((r||document).querySelectorAll(s)); }
function shuffle(a){ const b=a.slice(); for(let i=b.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [b[i],b[j]]=[b[j],b[i]]; } return b; }

const ROTAS = {
  materia:    { view:'view-materia',    render:(r,p)=>renderMateria(r,p) },
  exercicios: { view:'view-exercicios', render:(r,p)=>renderExercicios(r,p) },
  regex:      { view:'view-regex',      render:(r)=>renderRegexLab(r) },
  formulario: { view:'view-formulario', render:(r,p)=>renderFormulario(r,p) }
};

let ROTA_ATUAL = null;

function rotaDoHash(){
  const h = (location.hash || '#/materia').replace(/^#\/?/,'').split('?')[0];
  return ROTAS[h] ? h : 'materia';
}

function navegar(force){
  const nome = rotaDoHash();
  if(nome === ROTA_ATUAL && !force) return;
  ROTA_ATUAL = nome;

  qsa('.view').forEach(v => v.hidden = true);
  qsa('#tabs a').forEach(a => a.classList.toggle('on', a.dataset.route === nome));

  const alvo = qs('#' + ROTAS[nome].view);
  alvo.hidden = false;
  ROTAS[nome].render(alvo, DB.d.prova);
  atualizarProgressoGlobal();
  window.scrollTo({top:0, behavior:'instant'});
  ativarReveal(alvo);
  onScrollGlobal();
  sincronizarChat(nome);
}

/* ---------- tema ---------- */
function aplicarTema(){
  document.documentElement.dataset.theme = DB.d.theme;
  qs('#themeBtn').textContent = DB.d.theme === 'dark' ? '☀️' : '🌙';
}

/* ---------- prova ---------- */
function aplicarProva(){
  qsa('#provaSwitch button').forEach(b => b.classList.toggle('on', b.dataset.prova === DB.d.prova));
}

/* ---------- progresso global ---------- */
function todosOsItens(prova){
  const out = [];
  [EX_ORIGINAIS, EX_IA].forEach(src => (src[prova]||[]).forEach(g => g.itens.forEach(i => out.push(i))));
  return out;
}
function atualizarProgressoGlobal(){
  const itens = todosOsItens(DB.d.prova);
  const feitos = itens.filter(i => { const s = DB.get(i.id).st; return s==='ok'||s==='part'; }).length;
  const pct = itens.length ? Math.round(100*feitos/itens.length) : 0;
  const anel = qs('#brandRing');
  if(anel){
    let L = 148;
    try { if(anel.getTotalLength) L = anel.getTotalLength(); } catch(e){}
    anel.style.strokeDasharray = L.toFixed(2);
    anel.style.strokeDashoffset = (L * (1 - pct/100)).toFixed(2);
  }
  const sub = qs('#brandSub');
  if(sub) sub.innerHTML = feitos
    ? 'C05 · Compiladores · <b class="pct">' + pct + '%</b> da ' + DB.d.prova.toUpperCase()
    : 'C05 · Compiladores · Inatel';
  const marca = qs('.brand');
  if(marca) marca.title = itens.length
    ? 'Progresso: ' + feitos + ' de ' + itens.length + ' exercícios da ' + DB.d.prova.toUpperCase() +
      ' resolvidos (' + pct + '%). Clique para voltar ao topo.'
    : 'Jump of the Cat · clique para voltar ao topo';
}

/* ---------- animação de entrada ao rolar ---------- */
let IO_REVEAL = null;
const SEM_MOVIMENTO = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

function ativarReveal(root){
  if(SEM_MOVIMENTO || !('IntersectionObserver' in window)) return;
  if(!IO_REVEAL){
    IO_REVEAL = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add('in'); IO_REVEAL.unobserve(e.target); }
      });
    }, {rootMargin:'0px 0px -6% 0px', threshold:0.04});
  }
  qsa('.card:not(.fm-card), .grupo, .stat, figure, .ex-switch button, .empty', root)
    .forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = Math.min((i % 5) * 45, 180) + 'ms';
      IO_REVEAL.observe(el);
    });
}

/* ---------- barra de leitura + engrenagem que gira com a rolagem ---------- */
let _tick = false;
function onScrollGlobal(){
  if(_tick) return;
  _tick = true;
  requestAnimationFrame(() => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 4 ? (h.scrollTop / max) * 100 : 0;
    const barra = qs('#globalProgress');
    if(barra) barra.style.width = pct.toFixed(2) + '%';
    _tick = false;
  });
}

/* ---------- boot ---------- */
DB.load();
aplicarTema();
aplicarProva();

qs('#themeBtn').addEventListener('click', () => {
  DB.d.theme = DB.d.theme === 'dark' ? 'light' : 'dark';
  DB.save(); aplicarTema();
});

qsa('#provaSwitch button').forEach(b => b.addEventListener('click', () => {
  DB.d.prova = b.dataset.prova; DB.save(); aplicarProva(); invalidarIndice(); navegar(true);
}));

window.addEventListener('hashchange', () => navegar(false));
window.addEventListener('scroll', onScrollGlobal, {passive:true});
window.addEventListener('resize', onScrollGlobal, {passive:true});

qs('.brand').addEventListener('click', e => {
  if(rotaDoHash() === 'materia'){
    e.preventDefault();
    window.scrollTo({top:0, behavior: SEM_MOVIMENTO ? 'auto' : 'smooth'});
  }
});

initBusca();
initChat();
navegar(true);
