/* =============================================================
   CONTEÚDO DA MATÉRIA
   Estrutura:
   CONTEUDO = { p1: [capitulo, ...], p2: [...] }
   capitulo = { id, titulo, subtitulo, secoes:[ {id,num,titulo,blocos:[]} ] }

   Tipos de bloco aceitos (ver assets/js/materia.js):
   {t:'p',    v:'texto com <b>html</b>'}
   {t:'ul',   v:['item', ...]}            {t:'ol', v:[...]}
   {t:'table',head:[..], rows:[[..],..]}
   {t:'code', lang:'java', v:'...'}
   {t:'note', v:'...', kind:'warn'}
   {t:'cards',v:[{n:'1',ico:'🔍',t:'Título',d:'descrição'}]}
   {t:'split',up:['...'], down:['...']}   // favorecem / prejudicam
   {t:'flow', v:[{box:'..',accent:true}|{arrow:'rótulo opcional'}]}
   {t:'flowh',v:['A','B','C']}
   {t:'svg',  v:'<svg...>', cap:'legenda'}
   {t:'pipe', v:[{fase, box, ent:{k:'code'|'svg',v}, sai:{k,v}, nota}]}
   ============================================================= */

const SVG_TREE_SINTATICA = `<svg viewBox="0 0 430 250" role="img" aria-label="Árvore sintática do comando position = initial + rate * 60" style="font-family:var(--mono);font-size:13px">
<g stroke="currentColor" stroke-opacity=".45" stroke-width="1.4">
<line x1="200" y1="38" x2="110" y2="82"/><line x1="200" y1="38" x2="285" y2="82"/>
<line x1="285" y1="98" x2="205" y2="142"/><line x1="285" y1="98" x2="350" y2="142"/>
<line x1="350" y1="158" x2="285" y2="202"/><line x1="350" y1="158" x2="400" y2="202"/>
</g>
<g fill="currentColor" text-anchor="middle">
<text x="200" y="32" font-size="17" font-weight="700">=</text>
<text x="105" y="96">&#10216;id,1&#10217;</text>
<text x="290" y="96" font-size="17" font-weight="700">+</text>
<text x="198" y="156">&#10216;id,2&#10217;</text>
<text x="355" y="156" font-size="17" font-weight="700">*</text>
<text x="278" y="216">&#10216;id,3&#10217;</text>
<text x="400" y="216">60</text>
</g></svg>`;

const SVG_TREE_SEMANTICA = `<svg viewBox="0 0 430 310" role="img" aria-label="Árvore sintática com coerção inttofloat" style="font-family:var(--mono);font-size:13px">
<g stroke="currentColor" stroke-opacity=".45" stroke-width="1.4">
<line x1="200" y1="38" x2="110" y2="82"/><line x1="200" y1="38" x2="285" y2="82"/>
<line x1="285" y1="98" x2="205" y2="142"/><line x1="285" y1="98" x2="350" y2="142"/>
<line x1="350" y1="158" x2="285" y2="202"/><line x1="350" y1="158" x2="378" y2="202"/>
</g>
<line x1="378" y1="222" x2="378" y2="258" stroke="var(--accent)" stroke-width="1.6"/>
<g fill="currentColor" text-anchor="middle">
<text x="200" y="32" font-size="17" font-weight="700">=</text>
<text x="105" y="96">&#10216;id,1&#10217;</text>
<text x="290" y="96" font-size="17" font-weight="700">+</text>
<text x="198" y="156">&#10216;id,2&#10217;</text>
<text x="355" y="156" font-size="17" font-weight="700">*</text>
<text x="278" y="216">&#10216;id,3&#10217;</text>
<text x="378" y="216" fill="var(--accent)" font-weight="700">inttofloat</text>
<text x="378" y="276">60</text>
</g></svg>`;

const SVG_FASES = `<svg viewBox="0 0 620 400" role="img" aria-label="Diagrama das fases de um compilador" style="font-family:var(--sans);font-size:12px">
<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
<path d="M0,0 L7,3 L0,6 Z" fill="currentColor" fill-opacity=".55"/></marker></defs>
<g stroke="currentColor" stroke-opacity=".5" stroke-width="1.3" marker-end="url(#ar)" fill="none">
<line x1="310" y1="34" x2="310" y2="52"/><line x1="310" y1="80" x2="310" y2="98"/>
<line x1="310" y1="126" x2="310" y2="144"/><line x1="310" y1="172" x2="310" y2="190"/>
<line x1="310" y1="218" x2="310" y2="236"/><line x1="310" y1="264" x2="310" y2="282"/>
<line x1="310" y1="310" x2="310" y2="328"/>
</g>
<rect x="88" y="46" width="444" height="286" rx="10" fill="currentColor" fill-opacity=".035" stroke="currentColor" stroke-opacity=".18"/>
<g stroke="var(--accent)" stroke-opacity=".35" stroke-width="1" stroke-dasharray="3 3">
<path d="M110 96 H198"/><path d="M110 142 H198"/><path d="M110 188 H198"/>
<path d="M110 234 H198"/><path d="M110 280 H198"/><path d="M110 326 H198"/>
<path d="M510 96 H422"/><path d="M510 142 H422"/><path d="M510 188 H422"/>
<path d="M510 234 H422"/><path d="M510 280 H422"/><path d="M510 326 H422"/>
</g>
<g text-anchor="middle" fill="currentColor">
<rect x="215" y="10" width="190" height="26" rx="6" fill="var(--surface)" stroke="currentColor" stroke-opacity=".35"/><text x="310" y="27">Programa-Fonte</text>
<rect x="198" y="54" width="224" height="28" rx="6" fill="var(--accent-soft)" stroke="var(--accent)"/><text x="310" y="72" font-weight="600">1. Análise Léxica</text>
<rect x="198" y="100" width="224" height="28" rx="6" fill="var(--accent-soft)" stroke="var(--accent)"/><text x="310" y="118" font-weight="600">2. Análise Sintática</text>
<rect x="198" y="146" width="224" height="28" rx="6" fill="var(--accent-soft)" stroke="var(--accent)"/><text x="310" y="164" font-weight="600">3. Análise Semântica</text>
<rect x="198" y="192" width="224" height="28" rx="6" fill="var(--accent-soft)" stroke="var(--accent)"/><text x="310" y="210" font-weight="600">4. Ger. Código Intermediário</text>
<rect x="198" y="238" width="224" height="28" rx="6" fill="var(--surface2)" stroke="currentColor" stroke-opacity=".35"/><text x="310" y="256" font-weight="600">5. Otimização de Código</text>
<rect x="198" y="284" width="224" height="28" rx="6" fill="var(--surface2)" stroke="currentColor" stroke-opacity=".35"/><text x="310" y="302" font-weight="600">6. Geração de Código Alvo</text>
<rect x="215" y="336" width="190" height="26" rx="6" fill="var(--surface)" stroke="currentColor" stroke-opacity=".35"/><text x="310" y="353">Programa-Objeto</text>
<rect x="8" y="150" width="104" height="70" rx="8" fill="var(--surface)" stroke="currentColor" stroke-opacity=".35"/>
<text x="60" y="176" font-size="11">Gerenciador da</text><text x="60" y="190" font-size="11">Tabela de</text><text x="60" y="204" font-size="11">Símbolos</text>
<rect x="508" y="158" width="104" height="54" rx="8" fill="var(--surface)" stroke="currentColor" stroke-opacity=".35"/>
<text x="560" y="180" font-size="11">Tratador de</text><text x="560" y="196" font-size="11">Erros</text>
</g></svg>`;

const CONTEUDO = {
p1: [
/* ===================== CAPÍTULO 1 ===================== */
{
  id:'cap1',
  titulo:'Cap. 1 — Introdução às Linguagens de Programação e Compiladores',
  subtitulo:'Evolução das LPs, propriedades desejáveis, paradigmas, DSLs, compiladores × interpretadores e as fases da compilação.',
  secoes:[
    { id:'c1-obj', num:'', titulo:'Objetivos do capítulo', blocos:[
      {t:'ul', v:[
        'Discutir conceitos gerais e importantes sobre as linguagens de programação;',
        'Apresentar as diferentes formas de tradutores de Linguagens de Programação;',
        'Apresentar uma visão geral da estrutura de um compilador típico.'
      ]}
    ]},

    { id:'c1-1', num:'1.1', titulo:'Evolução das Linguagens de Programação', blocos:[
      {t:'p', v:'Os primeiros computadores eletrônicos apareceram na <b>década de 40</b> e eram programados em linguagem de máquina, diretamente por sequências de 0s e 1s — uma programação lenta, cansativa e passível de erros.'},
      {t:'p', v:'A pergunta que move toda a disciplina: <i>como criar formas de programação mais inteligíveis às pessoas, a fim de melhorar a produtividade na criação de softwares?</i> A resposta foi criar as linguagens de <b>alto nível</b>.'},
      {t:'p', v:'Existem hoje centenas de Linguagens de Programação. Uma das classificações possíveis é por <b>gerações</b>:'},
      {t:'table', head:['Geração','O que é','Exemplos'], rows:[
        ['1ª','Linguagens de máquina','sequências de 0 e 1'],
        ['2ª','Linguagens de montagem (Assembly)','Assembly de um processador específico'],
        ['3ª','Alto nível <b>procedurais</b> — seguem uma sequência lógica (<i>how to do</i>)','C++, Java, Python'],
        ['4ª','Aplicações específicas <b>não procedurais</b> (<i>what to do</i>)','SQL, Cypher, MQL'],
        ['5ª','Baseadas em lógica matemática; dão suporte à programação de IA','Prolog, Mercury']
      ]},
      {t:'note', v:'<b>Macete de prova:</b> 3ª geração = <i>how to do</i> (procedural) · 4ª geração = <i>what to do</i> (não procedural). Quanto maior a geração, mais distante do hardware e mais próximo do humano.'}
    ]},

    { id:'c1-2', num:'1.2', titulo:'Razões para estudar Linguagens de Programação', blocos:[
      {t:'ol', v:[
        'Capacidade de resolver soluções computacionais para problemas;',
        'Maior habilidade para escolher Linguagens de Programação apropriadas para casos específicos;',
        'Maior habilidade para aprender novas Linguagens de Programação;',
        'Maior capacidade para projetar novas Linguagens de Programação.'
      ]}
    ]},

    { id:'c1-3', num:'1.3', titulo:"Propriedades desejáveis das LP's", blocos:[
      {t:'cards', v:[
        {n:'1', ico:'🔍', t:'Legibilidade',      d:'Facilidade de ler e entender o programa.'},
        {n:'2', ico:'⌨️', t:'Redigibilidade',    d:'Facilidade de escrever o programa.'},
        {n:'3', ico:'🛡️', t:'Confiabilidade',    d:'Comporta-se conforme a especificação em qualquer condição.'},
        {n:'4', ico:'🏃', t:'Eficiência',        d:'Relacionada ao tempo de execução.'},
        {n:'5', ico:'🧩', t:'Ortogonalidade',    d:'Combinar conceitos básicos sem efeitos anômalos.'},
        {n:'6', ico:'♻️', t:'Reusabilidade',     d:'Usar o mesmo código em várias aplicações.'},
        {n:'7', ico:'🔧', t:'Modificabilidade',  d:'Alterar sem afetar outras partes.'},
        {n:'8', ico:'📱', t:'Portabilidade',     d:'Mesmo comportamento em qualquer plataforma.'}
      ]},

      {t:'h3', v:'1.3.1 Legibilidade'},
      {t:'ul', v:['Facilidade para ler e entender um programa;','Melhora a tarefa de manutenção dos programas.']},
      {t:'split',
        up:['Simplicidade;','Recursos para estruturação de dados e de controle.'],
        down:['Uso extensivo de <code>goto</code> — permite programação não estruturada;','Estruturas de dados não adequadas (ex.: <code>if-else</code> sem delimitadores de bloco);','Sobrecarga de operadores — mesmo símbolo com significados diferentes (ex.: <code>*</code> como multiplicação e como ponteiro).']},

      {t:'h3', v:'1.3.2 Redigibilidade'},
      {t:'ul', v:['Facilidade para escrever o programa, permitindo ao programador se concentrar nos algoritmos centrais sem se preocupar com aspectos não relevantes.']},
      {t:'split',
        up:['Simplicidade;','Suporte para abstração — de <b>processo</b> (ex.: subprograma) e de <b>dados</b> (ex.: classes).'],
        down:['Construções muito complexas;','Falta de recurso para abstração;','Muitas construções primitivas.']},

      {t:'h3', v:'1.3.3 Confiabilidade'},
      {t:'ul', v:['Um programa é confiável se ele se comportar de acordo com suas especificações <b>sob todas as condições</b>.']},
      {t:'split',
        up:['Verificação de tipos — em tempo de compilação ou de execução;','Tratamento de exceções — interceptar erros durante a execução e tomar medidas corretivas.'],
        down:['Permitir ações perigosas — não verificar intervalos de índices de arrays, aritmética de ponteiros, compatibilidade de tipos;','Recursos pobres para escrita dos programas.']},

      {t:'h3', v:'1.3.4 Eficiência'},
      {t:'ul', v:[
        'Está relacionada com o <b>tempo de execução</b> de um programa;',
        'Algumas aplicações exigem execução rápida (ex.: aplicações de tempo real);',
        'Em geral, fatores que melhoram confiabilidade, abstração e legibilidade <b>diminuem</b> a eficiência;',
        'LPs que requerem verificação de tipos em tempo de execução são menos eficientes.'
      ]},
      {t:'note', kind:'warn', v:'<b>Trade-off clássico de prova:</b> confiabilidade / abstração / legibilidade ↑ ⇒ eficiência ↓.'},

      {t:'h3', v:'1.3.5 Ortogonalidade'},
      {t:'ul', v:[
        'Capacidade de a LP permitir ao programador combinar seus conceitos básicos sem que se produzam efeitos anômalos nessa combinação;',
        'Quanto <b>menor</b> o número de exceções, <b>maior</b> a ortogonalidade;',
        'O programador consegue prever com segurança o comportamento de uma combinação de conceitos.'
      ]},
      {t:'split',
        up:['Número pequeno de construções primitivas que podem ser combinadas de forma regular.'],
        down:['Número alto de exceções às regras da linguagem;','Operadores que não podem ser aplicados a qualquer tipo de operando.']},

      {t:'h3', v:'1.3.6 Reusabilidade'},
      {t:'ul', v:[
        'Propriedade de utilizar o mesmo código para várias aplicações;',
        'Ligada aos recursos de abstração: subprogramas com parâmetros, bibliotecas, classes, APIs;',
        'Quanto mais reusável o código, maior a produtividade de programação.'
      ]},

      {t:'h3', v:'1.3.7 Modificabilidade'},
      {t:'ul', v:['Facilidade de alterar o programa sem implicações em outras partes do mesmo.']},
      {t:'split',
        up:['Uso de constantes simbólicas — <code>final</code> (Java), <code>const</code> (C);','Separação entre interface gráfica e lógica de negócio;','Tipos abstratos de dados.'],
        down:['(o material não lista fatores que prejudicam — por dedução: valores mágicos espalhados, alto acoplamento.)']},

      {t:'h3', v:'1.3.8 Portabilidade'},
      {t:'ul', v:['Propriedade dos programas escritos em uma LP se comportarem da mesma maneira independente do compilador, do sistema operacional ou do hardware utilizado.']},
      {t:'split',
        up:['Implementação híbrida (ex.: Java);','Padronização da especificação da linguagem desde o seu projeto (pode prejudicar o desempenho).'],
        down:['Dependência de recursos específicos de um SO ou arquitetura.']}
    ]},

    { id:'c1-4', num:'1.4', titulo:'Paradigmas das LPs', blocos:[
      {t:'p', v:'Dá-se o nome de <b>paradigma</b> a um conjunto de características que servem para categorizar um grupo de linguagens.'},
      {t:'table', head:['Grupo','Paradigmas','Ideia central'], rows:[
        ['<b>Imperativos</b>','Estruturado · Orientado a Objetos · Concorrente','<b>COMO</b> o processamento deve ser feito'],
        ['<b>Declarativos</b>','Funcional · Lógico','<b>O QUE</b> deve ser feito']
      ]},

      {t:'h3', v:'1.4.1 Imperativo'},
      {t:'ul', v:[
        'Computação vista como um processo que realiza <b>mudanças de estado</b>;',
        'Especifica <b>como</b> um processamento deve ser feito para o computador;',
        'Variáveis podem possuir diferentes valores a cada momento.'
      ]},
      {t:'h4', v:'A) Estruturado'},
      {t:'ul', v:[
        'Facilita a compreensão de programas, comparado à programação com código de máquina;',
        'Um programa é composto por <b>blocos aninhados</b> de comandos;',
        'Utiliza três mecanismos básicos: <b>sequência, seleção e iteração</b>;',
        'Ex.: PASCAL, C.'
      ]},
      {t:'h4', v:'B) Orientado a Objetos'},
      {t:'ul', v:[
        'Visto como uma <b>evolução do paradigma estruturado</b>;',
        'Torna o desenvolvimento mais rápido e confiável;',
        'Enfoque nas <b>abstrações de dados</b>, em vez do controle de execução (estruturado);',
        'Classes são abstrações que definem uma estrutura de dados; objetos são instâncias de classes;',
        'Ex.: SMALLTALK, C++, JAVA.'
      ]},
      {t:'cards', v:[
        {ico:'🏛️', t:'Classes',            d:'Abstração que define estrutura e comportamento.'},
        {ico:'🎭', t:'Polimorfismo',        d:'Mesma interface, comportamentos diferentes.'},
        {ico:'🧬', t:'Herança',             d:'Reaproveitamento e especialização.'},
        {ico:'📦', t:'Abstração de dados',  d:'Expor o essencial, esconder o resto.'},
        {ico:'🔒', t:'Encapsulamento',      d:'Estado interno protegido pela interface.'}
      ]},
      {t:'h4', v:'C) Concorrente'},
      {t:'ul', v:[
        'Vários processos executando simultaneamente (suporte a <i>threads</i>), concorrendo por recursos;',
        'Pode usar uma ou várias unidades de processamento (no mesmo computador ou distribuídas geograficamente);',
        'Ex.: ADA, JAVA, C#.'
      ]},

      {t:'h3', v:'1.4.2 Declarativo'},
      {t:'ul', v:[
        'Linguagens que especificam diretamente ao computador <b>O QUE</b> deve ser feito;',
        'O programador descreve o problema, e essa descrição é usada para encontrar automaticamente uma ou mais soluções.'
      ]},
      {t:'h4', v:'A) Funcional'},
      {t:'ul', v:[
        'Operam apenas sobre funções definidas, que recebem uma lista de valores e retornam um valor;',
        'Trabalha com <b>composição</b> de funções e <b>chamada recursiva</b>;',
        'Ex.: LISP, HASKELL.'
      ]},
      {t:'code', lang:'lisp', v:'(plus 6 9)                    ; soma 6 + 9\n(plus (plus 3 4) (plus 6 7))  ; soma 3 + 4 com 6 + 7'},
      {t:'h4', v:'B) Lógico'},
      {t:'ul', v:[
        'Faz uso da lógica matemática;',
        'Geralmente utiliza uma base de conhecimento (<b>fatos</b>) e <b>regras</b>, respondendo a <b>consultas</b>;',
        'Empregado em problemas resolvidos por dedução ou inferência;',
        'Muito utilizado na área de Inteligência Artificial;',
        'Ex.: PROLOG.'
      ]},
      {t:'code', lang:'prolog', v:'gosta(joão, flores).\ngosta(joão, maria).\ngosta(paulo, maria).\n\n?- gosta(joão, X).'},

      {t:'h3', v:'1.4.3 Linguagens Multiparadigma'},
      {t:'ul', v:[
        'Suportam mais de um paradigma de programação;',
        'Geralmente utilizam frameworks para permitir o uso de diversos paradigmas de forma mais clara;',
        'Ex.: SCALA.'
      ]}
    ]},

    { id:'c1-5', num:'1.5', titulo:'Linguagens de Domínio Específico (DSL)', blocos:[
      {t:'p', v:'Os paradigmas e linguagens vistos até aqui são <b>GPL</b> (<i>general-purpose languages</i>), ou linguagens de uso geral.'},
      {t:'p', v:'Uma <b>DSL</b> (<i>domain-specific language</i>) é um tipo de linguagem dedicada e especializada para um domínio de aplicação específico.'},
      {t:'table', head:['DSL','Domínio'], rows:[
        ['HTML','Criação de páginas'],
        ['VHDL','Design de hardware'],
        ['SQL','Definição e manipulação de banco de dados']
      ]},
      {t:'note', v:'DSLs muito simples, usadas geralmente para um único tipo específico de aplicação, são denominadas <b>mini-linguagens</b>.'}
    ]},

    { id:'c1-6', num:'1.6', titulo:'Compiladores e Interpretadores', blocos:[
      {t:'p', v:'Programas escritos em linguagens de alto nível precisam ser traduzidos para uma linguagem de mais baixo nível (código de máquina) para que possam ser executados. Existem dois métodos básicos de tradução: <b>compiladores</b> e <b>interpretadores</b>.'},

      {t:'h3', v:'1.6.1 Compiladores'},
      {t:'p', v:'Compilador é um programa que recebe como entrada um programa em uma linguagem de programação (<i>source language</i>) e o traduz em um programa equivalente em outra linguagem, denominado programa objeto (<i>target language</i>).'},
      {t:'flowh', v:['Linguagem Fonte','⚙️ COMPILADOR','Linguagem Alvo']},
      {t:'table', head:['Fonte','Tradutor','Objeto'], rows:[
        ['<code>teste.java</code>','<code>javac</code>','<code>teste.class</code>'],
        ['<code>teste.c</code>','<code>gcc</code>','<code>teste.o</code>']
      ]},
      {t:'p', v:'Além do compilador, outros programas podem ser necessários para criar um programa objeto executável:'},
      {t:'flow', v:[
        {box:'source program'}, {arrow:''},
        {box:'Preprocessor'}, {arrow:'modified source program'},
        {box:'Compiler', accent:true}, {arrow:'target assembly program'},
        {box:'Assembler'}, {arrow:'relocatable machine code'},
        {box:'Linker / Loader'}, {arrow:'target machine code'},
        {box:'output'}
      ]},
      {t:'ul', v:[
        '<b>Pré-processador:</b> programa separado ativado pelo compilador antes do início da tradução, para operações simples — apagar comentários, incluir outros arquivos (ex.: <code>#include</code> em C), executar substituições de macros;',
        '<b>Montador (Assembler):</b> recebe a linguagem assembly gerada pelo compilador e produz um <b>código de máquina relocável</b>;',
        '<b>Linker / Loader:</b> programas grandes normalmente são compilados em partes. O <b>Linker</b> combina um ou mais arquivos objeto em um executável; o <b>Loader</b> reúne os executáveis na memória para execução.'
      ]},
      {t:'h4', v:'Bibliotecas (Libraries)'},
      {t:'table', head:['Tipo','Quando entra','Exemplos'], rows:[
        ['<b>Estáticas</b>','Inseridas <b>antes</b> de utilizar um compilador específico','<code>.h</code> em C, import de <i>jars</i> em Java'],
        ['<b>Dinâmicas</b>','Inseridas em <b>uma das fases</b> do compilador','<code>.lib</code>, <code>.dll</code> (<i>dynamic linking library</i>)']
      ]},
      {t:'note', v:'As bibliotecas <b>dinâmicas</b> são dependentes do sistema operacional; as <b>estáticas</b> podem ser compiladas juntamente com o código do programa.'}
    ]},

    { id:'c1-6-1-1', num:'1.6.1.1', titulo:'Fases de um Compilador', blocos:[
      {t:'p', v:'Até aqui tratamos o compilador como uma “caixa preta”. Internamente ele é subdividido em módulos, cada um com uma função específica:'},
      {t:'table', head:['#','Fase','Produz'], rows:[
        ['1','Análise Léxica (leitura / <i>scanning</i>)','Tokens (a partir de lexemas)'],
        ['2','Análise Sintática','Árvore sintática'],
        ['3','Análise Semântica','Árvore anotada / tipos corretos'],
        ['4','Geração de Código Intermediário','Código de três endereços'],
        ['5','Otimização','Código intermediário melhorado'],
        ['6','Geração de Código Alvo','Assembly da arquitetura']
      ]},
      {t:'split',
        up:['<b>Front-End (Análise)</b>','1. Análise Léxica','2. Análise Sintática','3. Análise Semântica','4. Geração de Código Intermediário'],
        down:['<b>Back-End (Síntese)</b>','5. Otimização','6. Geração de Código Objeto']},
      {t:'note', v:'Na figura do material, o bloco “favorece/prejudica” acima corresponde à divisão <b>Front-End (Análise)</b> → <b>Back-End (Síntese)</b>; o Front-End depende da linguagem-fonte e o Back-End, da máquina alvo.'},
      {t:'svg', v:SVG_FASES, cap:'Fases de um compilador. O Gerenciador da Tabela de Símbolos e o Tratador de Erros são submódulos comuns a todas as fases.'},

      {t:'h3', v:'Tabela de Símbolos'},
      {t:'p', v:'Estrutura de dados responsável por armazenar informações de todos os identificadores (variáveis e palavras-chave) durante a compilação. Pode guardar:'},
      {t:'ul', v:['Tipos de dados;','Tamanho dos tipos de dados;','Escopos;','Entre outras informações relevantes.']},
      {t:'p', v:'Como é acessada com bastante frequência, o acesso deve ser eficiente. Estruturas rápidas para implementá-la: <b>tabelas hash</b>, <b>árvore binária de busca</b>, pilhas e filas.'},

      {t:'h3', v:'Tratador de Erros'},
      {t:'p', v:'Parte do compilador responsável por tratar erros em qualquer uma das fases. Duas estratégias básicas:'},
      {t:'ol', v:[
        '<b>Abortar:</b> parar a compilação em qualquer uma das fases caso seja encontrado algum erro;',
        '<b>Recuperar:</b> tentar continuar o processo de compilação, desconsiderando algum fato.'
      ]}
    ]},

    { id:'c1-pipeline', num:'', titulo:'As 6 fases aplicadas: position = initial + rate * 60', blocos:[
      {t:'p', v:'Percorra o mesmo comando pelas seis fases do compilador — é o exemplo que cai em prova.'},
      {t:'pipe', v:[
        { fase:'1. Análise Léxica', box:'Lexical Analyzer',
          ent:{k:'code', v:'position = initial + rate * 60'},
          sai:{k:'code', v:'⟨id,1⟩ ⟨=⟩ ⟨id,2⟩ ⟨+⟩ ⟨id,3⟩ ⟨*⟩ ⟨60⟩'},
          nota:'O fluxo de caracteres é lido e agrupado em <b>lexemas</b>; cada lexema recebe uma classe e vira um <b>token</b>. Os identificadores vão para a Tabela de Símbolos: <b>1</b> position · <b>2</b> initial · <b>3</b> rate.'},
        { fase:'2. Análise Sintática', box:'Syntax Analyzer',
          ent:{k:'code', v:'⟨id,1⟩ ⟨=⟩ ⟨id,2⟩ ⟨+⟩ ⟨id,3⟩ ⟨*⟩ ⟨60⟩'},
          sai:{k:'svg', v:SVG_TREE_SINTATICA},
          nota:'Usa os tokens para criar uma representação intermediária em <b>árvore</b>, que mostra uma interação válida entre a sequência de tokens. Cada nó interior representa uma operação, e os filhos representam os argumentos dessa operação.'},
        { fase:'3. Análise Semântica', box:'Semantic Analyzer',
          ent:{k:'svg', v:SVG_TREE_SINTATICA},
          sai:{k:'svg', v:SVG_TREE_SEMANTICA},
          nota:'Usa a árvore sintática e a tabela de símbolos para verificar a consistência semântica. A parte mais importante é a <b>verificação de tipo</b>. Aqui ocorre a <b>coerção</b> do inteiro 60 para float (<code>inttofloat</code>).'},
        { fase:'4. Geração de Código Intermediário', box:'Intermediate Code Generator',
          ent:{k:'svg', v:SVG_TREE_SEMANTICA},
          sai:{k:'code', v:'t1 = inttofloat(60)\nt2 = id3 * t1\nt3 = id2 + t2\nid1 = t3'},
          nota:'A representação intermediária deve ser <b>facilmente produzida</b> e <b>facilmente traduzida</b> para a máquina alvo. A mais usada é o <b>Código de Três Endereços</b>: uma operação, dois operandos de entrada e um operando de saída.'},
        { fase:'5. Otimização de Código', box:'Code Optimizer',
          ent:{k:'code', v:'t1 = inttofloat(60)\nt2 = id3 * t1\nt3 = id2 + t2\nid1 = t3'},
          sai:{k:'code', v:'t1 = id3 * 60.0\nid1 = id2 + t1'},
          nota:'Transformações no código intermediário para produzir um código melhor, mais rápido e que consuma menos energia (independente da arquitetura). Técnicas: inibição de variáveis declaradas e não utilizadas, otimização de laços, inibição de segmentos de código não relevantes.'},
        { fase:'6. Geração de Código Alvo', box:'Code Generator',
          ent:{k:'code', v:'t1 = id3 * 60.0\nid1 = id2 + t1'},
          sai:{k:'code', v:'LDF  R2, id3\nMULF R2, R2, #60.0\nLDF  R1, id2\nADDF R1, R1, R2\nSTF  id1, R1'},
          nota:'Gera a saída em linguagem <b>Assembly</b>. Cada assembly é específico de uma arquitetura; depois desta fase o <b>Assembler</b> produz o código de máquina (0s e 1s).'}
      ]}
    ]},

    { id:'c1-6-1-2', num:'1.6.1.2', titulo:'Compilação Cruzada', blocos:[
      {t:'p', v:'É a técnica usada para compilar programas de uma plataforma <b>Y</b> a partir de uma plataforma <b>X</b>, onde X ≠ Y.'},
      {t:'p', v:'Com ela é possível compilar dentro de um PC programas que vão rodar em outra plataforma destino — Android ou qualquer plataforma embarcada, onde memória e armazenamento são mais limitados.'},
      {t:'flowh', v:['PC (Windows ou Linux)','→ cross-gcc-arm →','binário ARM','→','Raspberry Pi / BeagleBone Black']}
    ]},

    { id:'c1-6-2', num:'1.6.2', titulo:'Interpretadores', blocos:[
      {t:'p', v:'Um interpretador é um programa capaz de interpretar as instruções da linguagem fonte (alto nível), <b>executando-as diretamente</b>.'},
      {t:'ul', v:[
        'Traduz o código fonte <b>linha a linha</b>: as instruções de cada linha são lidas, verificadas e convertidas diretamente em linguagem de máquina;',
        'O código fonte <b>não é totalmente traduzido</b> antes de ser executado;',
        'Geralmente utiliza apenas recursos da Análise Léxica, Sintática e Semântica;',
        'Ex.: JavaScript, Python, PHP, Ruby.'
      ]},
      {t:'h3', v:'1.6.3 Compilador × Interpretador'},
      {t:'table', head:['Compilador','Interpretador'], rows:[
        ['O código fonte é compilado para uma arquitetura específica.','O código fonte é interpretado diretamente por um programa.'],
        ['Tempo de execução é rápido.','Tempo de execução depende do tamanho do programa.'],
        ['O código alvo é otimizado para acelerar a execução.','A interpretação do código não otimiza o código fonte.'],
        ['Em <code>A = (B*C) + (B*C) + (B*C)</code>, cria uma variável temporária para <code>(B*C)</code> e não recalcula.','Em <code>A = (B*C) + (B*C) + (B*C)</code>, recalcula <code>(B*C)</code> 3 vezes, diminuindo o desempenho.']
      ]},
      {t:'h3', v:'1.6.4 Compiladores Híbridos'},
      {t:'p', v:'Em linguagens híbridas o compilador converte o código fonte em <b>bytecode</b>, uma linguagem de baixo nível. O compilador Java, em vez de gerar código da máquina hospedeira, gera <b>Java Bytecode</b>, interpretado por uma <b>Máquina Virtual</b>.'},
      {t:'flowh', v:['source program','→ Translator →','intermediate program (bytecode)','→ Virtual Machine →','output']},
      {t:'note', v:'É por isso que a <b>implementação híbrida favorece a portabilidade</b> (§1.3.8) — o bytecode é o mesmo em qualquer plataforma que tenha a VM.'}
    ]}
  ]
},

/* ===================== CAPÍTULO 2 ===================== */
{
  id:'cap2',
  titulo:'Cap. 2 — Análise Léxica (Parte 1)',
  subtitulo:'Tokens, padrões e lexemas; expressões regulares e suas extensões.',
  secoes:[
    { id:'c2-obj', num:'', titulo:'Objetivos do capítulo', blocos:[
      {t:'ul', v:[
        'Apresentar de forma geral as principais partes e funções de um Analisador Léxico;',
        'Verificar para que serve e como funciona o reconhecimento de Tokens;',
        'Apresentar o que são Expressões Regulares e sua importância na construção de Analisadores Léxicos e de reconhecedores de padrões textuais.'
      ]}
    ]},

    { id:'c2-1', num:'2.1', titulo:'Introdução', blocos:[
      {t:'p', v:'A Análise Léxica é a <b>primeira fase</b> de um compilador. A tarefa principal do Analisador Léxico é ler os caracteres de entrada do programa fonte, agrupá-los em <b>lexemas</b> e produzir como saída uma sequência de <b>tokens</b> para cada lexema.'},
      {t:'flowh', v:['Programa Fonte','→','Analisador Léxico','→','Fluxo de Tokens + Mensagens de Erro']},
      {t:'p', v:'Geralmente os analisadores léxicos são divididos em duas etapas:'},
      {t:'table', head:['Etapa','O que faz'], rows:[
        ['<b>1) Varredura</b> (<i>scanning</i>)','Remove comentários e espaços desnecessários — como um pré-processamento.'],
        ['<b>2) Análise Léxica</b>','A parte mais complexa: produz a sequência de tokens como saída.']
      ]},
      {t:'code', lang:'text', v:'while (i > 1) do i = i - 1;\n\n→  <while> <(> <id,i> <op,">"> ...'}
    ]},

    { id:'c2-2', num:'2.2', titulo:'Análise Léxica × Análise Sintática', blocos:[
      {t:'p', v:'A principal razão para separar as duas fases é que elas fazem <b>trabalhos diferentes</b>:'},
      {t:'table', head:['Análise Léxica','Análise Sintática'], rows:[
        ['Encontra <b>padrões</b> em um texto (lexemas) e os transforma em <b>tokens</b> (lexemas já classificados).','Verifica se a <b>interação</b> entre um conjunto de tokens é ou não válida dentro da linguagem, por meio de uma <b>gramática</b>.'],
        ['Entrada: fluxo de caracteres.','Entrada: fluxo de tokens.'],
        ['Saída: fluxo de tokens.','Saída: árvore sintática.']
      ]},
      {t:'p', v:'Apesar de às vezes parecerem fazer tarefas semelhantes, cada fase possui seu próprio conjunto de técnicas para solução de problemas computacionais.'},
      {t:'svg', v:SVG_TREE_SINTATICA, cap:'Saída do Analisador Sintático para position = initial + rate * 60.'}
    ]},

    { id:'c2-3', num:'2.3', titulo:'Tokens, Padrões e Lexemas', blocos:[
      {t:'cards', v:[
        {n:'1', ico:'🔤', t:'Lexema', d:'Sequência de caracteres detectada no programa fonte que obedece a algum padrão válido da linguagem (nome de variável, número, palavra reservada...).'},
        {n:'2', ico:'🏷️', t:'Token', d:'Par ⟨Nome_Token, Lexema⟩. O nome é uma palavra abstrata que representa uma classe de lexemas.'},
        {n:'3', ico:'📐', t:'Padrão', d:'Descrição da forma que os lexemas de um token podem assumir.'}
      ]},
      {t:'ul', v:[
        '<b>Palavras reservadas:</b> o padrão é apenas a sequência de caracteres que forma a própria palavra reservada;',
        '<b>Identificadores:</b> o padrão é uma estrutura mais complexa, formada por diferentes sequências de caracteres.'
      ]},
      {t:'p', v:'Exemplos de possíveis classes de tokens (podem mudar de linguagem para linguagem):'},
      {t:'table', head:['Classe do Token','Padrão (descrição)','Exemplo de lexema'], rows:[
        ['Palavras-chave','Caracteres i,f — caracteres e,l,s,e','<code>if</code>, <code>else</code>'],
        ['Operador','<code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>!=</code> <code>&gt;=</code> <code>==</code>','<code>&lt;=</code>, <code>!=</code>'],
        ['Identificador','Letra, seguida por letra e dígitos','<code>x</code>, <code>x1</code>, <code>x2</code>, <code>nome</code>'],
        ['Literal','Qualquer constante numérica / qualquer caractere entre <code>""</code>','<code>3.1416</code>, <code>"Inatel"</code>']
      ]},
      {t:'note', v:'Nos exercícios do material os nomes usados são: <b>ID</b> (identificadores), <b>KW</b> (palavras-chave), <b>LT</b> (literais), <b>SP</b> (separadores) e <b>OP</b> (operadores). Referência: <a href="https://tinyurl.com/tokens-java" target="_blank" rel="noopener">tinyurl.com/tokens-java</a>.'}
    ]},

    { id:'c2-4', num:'2.4', titulo:'Expressões Regulares', blocos:[
      {t:'p', v:'Também chamada de <i>Regular Expression</i> (Regex), é um tipo de notação que fornece uma forma <b>concisa e flexível</b> para identificar possíveis padrões em cadeias de caracteres.'},
      {t:'ul', v:[
        'Notação muito importante para especificar padrões para os lexemas;',
        'Oferece um modo <b>declarativo</b> de expressar padrões que serão aceitos;',
        'Traduz um conjunto de padrões complicados numa expressão curta e relativamente fácil de interpretar.'
      ]},
      {t:'h3', v:'Conceitos fundamentais'},
      {t:'cards', v:[
        {ico:'Σ', t:'Alfabeto', d:'Conjunto de símbolos finito e não vazio. Ex.: Σ={0,1}; Σ={a..z}; todos os caracteres ASCII.'},
        {ico:'🧵', t:'String', d:'Cadeia finita de símbolos escolhidos de algum alfabeto. Ex.: 010111 é string do alfabeto binário.'},
        {ico:'🗣️', t:'Linguagem', d:'Conjunto de strings escolhidas a partir de algum Σ*, ou seja, L ⊆ Σ*.'}
      ]},
      {t:'ul', v:[
        '<b>String vazia (ε):</b> zero ocorrências de símbolos — pode ser escolhida de qualquer alfabeto;',
        '<b>Comprimento |w|:</b> número de posições da string. Ex.: |010111| = 6;',
        '<b>Σ*</b> denota o conjunto de todas as strings sobre o alfabeto Σ.'
      ]},
      {t:'p', v:'Exemplos de linguagens: (1) todas as strings com N zeros seguidos de N uns, N ≥ 0 → {ε, 01, 0011, 000111, …}; (2) strings de 0s e 1s com número igual de cada um → {ε, 01, 10, 0011, 0101, 1001, …}; (3) {ε}, a linguagem que consiste apenas na string vazia — é uma linguagem sobre qualquer alfabeto.'},

      {t:'h3', v:'Os três operadores fundamentais'},
      {t:'table', head:['Operador','Definição','Exemplo com L = {001, 10, 111} e M = {ε, 001}'], rows:[
        ['<b>União</b> (L ∪ M)','Strings que estão em L ou em M, ou em ambas.','L ∪ M = {ε, 10, 001, 111}'],
        ['<b>Concatenação</b> (L.M ou LM)','Qualquer string de L concatenada com qualquer string de M.','LM = {001, 10, 111, 001001, 10001, 111001}'],
        ['<b>Fecho de Kleene</b> (L*)','Qualquer número de strings de L, com repetições e concatenação.','Se L={0,1} → todas as strings de 0s e 1s. Se L={0,11} → ε, 0, 11, 011, 00, 1111, 01111…']
      ]},

      {t:'h3', v:'Identificadores da linguagem C em REGEX'},
      {t:'p', v:'Se “letra” significa qualquer letra ou o símbolo <i>underline</i>, e “dígito” significa qualquer dígito:'},
      {t:'code', lang:'regex', v:'letra (letra | dígito)*'},
      {t:'ul', v:[
        'A barra vertical <code>|</code> significa <b>união</b> (alternância);',
        'Os parênteses agrupam subexpressões;',
        'O <code>*</code> significa “zero ou mais ocorrências de” — é o fechamento;',
        'A justaposição do primeiro “letra” com o restante significa <b>concatenação</b>.'
      ]},
      {t:'h4', v:'Precedência (permite remover parênteses)'},
      {t:'ol', v:[
        'O operador unário <code>*</code> tem a precedência <b>mais alta</b> e é associativo à esquerda;',
        'A <b>concatenação</b> tem a segunda maior precedência, também associativa à esquerda;',
        '<code>|</code> tem a precedência <b>mais baixa</b> e também é associativo à esquerda.'
      ]},
      {t:'note', v:'Com essas convenções, <code>(a) | ((b)*(c))</code> pode ser escrita como <code>a | b*c</code>. As duas denotam “o conjunto de cadeias que são um único <i>a</i>, ou zero ou mais <i>b</i>s seguidos por um <i>c</i>”.'},

      {t:'h3', v:'Outros operadores importantes'},
      {t:'p', v:'Dado o alfabeto Σ = {a, b}:'},
      {t:'table', head:['Operador','Significado','Exemplos'], rows:[
        ['<code>.</code>','Qualquer caractere sozinho do alfabeto','<code>ab.</code> = {aba, abb} · <code>a.b.</code> = {aaba, aabb, abba, abbb}'],
        ['<code>+</code>','Uma ou mais instâncias (fechamento positivo); associativo à esquerda','<code>a+</code> = {a, aa, aaa…} · <code>ba+</code> = {ba, baa, baaa…}'],
        ['<code>?</code>','Zero ou uma instância; associativo à esquerda','<code>ab?</code> = {a, ab} · <code>a?b?</code> = {ε, a, b, ab}']
      ]}
    ]},

    { id:'c2-5', num:'2.5', titulo:'Extensões para as Expressões Regulares', blocos:[
      {t:'p', v:'Com o tempo o REGEX ganhou “upgrades” para ficar mais enxuto sem perder capacidade de reconhecimento. Um exemplo é a <b>classe de caracteres</b>.'},
      {t:'h3', v:'Classe de caracteres [ ]'},
      {t:'p', v:'O operador <code>[]</code> busca uma ocorrência de um dos caracteres que se encontram no seu interior.'},
      {t:'table', head:['Expressão','Significado'], rows:[
        ['<code>[ab]</code>','uma ocorrência de “a” ou “b”'],
        ['<code>[a-h]</code>','uma ocorrência de “a”, “b”, “c” … até “h”'],
        ['<code>[a-z]</code>','qualquer letra minúscula'],
        ['<code>[a-zA-Z]</code>','qualquer letra'],
        ['<code>[0-9]</code>','qualquer número entre 0 e 9'],
        ['<code>[.]</code>','o literal “.”'],
        ['<code>[a-zA-Z][.]</code>','qualquer letra seguida do literal “.”'],
        ['<code>[a-z-]</code>','qualquer letra minúscula ou o literal “-”'],
        ['<code>[^a-z]</code>','tudo que <b>não</b> é uma letra minúscula'],
        ['<code>[a-z^]</code>','qualquer letra minúscula ou o literal “^”']
      ]},
      {t:'h3', v:'Operador {m,n}'},
      {t:'p', v:'Determina a quantidade mínima e máxima de caracteres das strings pertencentes a uma linguagem.'},
      {t:'table', head:['Expressão','Significado'], rows:[
        ['<code>[a-z]{2,4}</code>','de 2 até 4 ocorrências de qualquer letra minúscula'],
        ['<code>[a-z]{1,}</code>','no mínimo uma ocorrência de uma letra'],
        ['<code>[0-9]{3}</code>','exatamente 3 números'],
        ['<code>[a-zA-Z0-9]{,5}</code>','string de até 5 caracteres entre letras e números']
      ]},
      {t:'note', v:'Para praticar: <a href="https://pythex.org/" target="_blank" rel="noopener">pythex.org</a> — ou use a aba <b>Regex Lab</b> aqui do site, que faz a mesma coisa sem sair da página.'}
    ]}
  ]
}
],
p2: []
};
