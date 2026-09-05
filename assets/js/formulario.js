/* =============================================================
   FORMULÁRIO — folha de consulta imprimível
   ============================================================= */

function cardFormulario(c){
  let corpo = '';
  if(c.tipo === 'table'){
    corpo = '<div class="tbl-wrap"><table>' +
      (c.head ? '<thead><tr>' + c.head.map(h => '<th>' + h + '</th>').join('') + '</tr></thead>' : '') +
      '<tbody>' + c.rows.map(r => '<tr>' + r.map((x,i) => '<td>' + (i===0 && !c.head ? '<b>'+x+'</b>' : x) + '</td>').join('') + '</tr>').join('') +
      '</tbody></table></div>';
  } else if(c.tipo === 'list'){
    corpo = '<ul style="margin:0">' + c.v.map(i => '<li>' + i + '</li>').join('') + '</ul>';
  } else if(c.tipo === 'kv'){
    corpo = '<div class="kbd-list">' + c.v.map(p => '<div><b>' + p[0] + '</b><span>' + p[1] + '</span></div>').join('') + '</div>';
  }
  return '<div class="card fm-card" id="' + c.id + '" data-busca="' + esc(norm(c.titulo + ' ' + JSON.stringify(c.v || c.rows || ''))) + '">' +
    '<h3><span class="ico">' + c.ico + '</span>' + esc(c.titulo) + '</h3>' + corpo + '</div>';
}

function renderFormulario(root, prova){
  const cards = FORMULARIO[prova] || [];
  if(!cards.length){ root.innerHTML = vazioP2('o formulário'); return; }

  root.innerHTML =
    '<div class="page-head">' +
      '<span class="eyebrow">📋 Prova ' + prova.replace('p','') + ' · consulta rápida</span>' +
      '<h1>Formulário</h1>' +
      '<p>Tudo o que vale decorar em um lugar só: operadores de regex, classes de token, fases do compilador e as tabelas comparativas. Feito para revisar na véspera — e para imprimir.</p>' +
    '</div>' +
    '<div class="fm-search no-print" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">' +
      '<input type="text" id="fmQ" placeholder="🔍 filtrar (ex.: kleene, token, linker, precedência)" style="flex:1 1 280px">' +
      '<button class="btn" id="fmPrint">🖨️ Imprimir / salvar em PDF</button>' +
    '</div>' +
    '<div class="fm-grid" id="fmGrid">' + cards.map(cardFormulario).join('') + '</div>' +
    '<p class="muted no-print" style="text-align:center;margin-top:20px;font-size:12.5px" id="fmVazio" hidden>Nada encontrado com esse termo.</p>';

  qs('#fmPrint').onclick = () => window.print();
  qs('#fmQ').addEventListener('input', e => {
    const q = norm(e.target.value.trim());
    let visiveis = 0;
    qsa('.fm-card', root).forEach(c => {
      const mostra = !q || c.dataset.busca.indexOf(q) >= 0;
      c.style.display = mostra ? '' : 'none';
      if(mostra) visiveis++;
    });
    qs('#fmVazio').hidden = visiveis > 0;
  });
}
