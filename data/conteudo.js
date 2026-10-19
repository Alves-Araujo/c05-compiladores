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
p2: [

/* ===================== CAPÍTULO 2 — PARTE 2 ===================== */
{
  id:'p2-cap2a',
  titulo:'Cap. 2 — Análise Léxica (Parte 2)',
  subtitulo:'Autômatos finitos, autômatos finitos determinísticos (AFD), diagramas e tabelas de transição, e a ferramenta JFLAP.',
  secoes:[
    { id:'p2a-obj', num:'', titulo:'Objetivos do capítulo', blocos:[
      {t:'ul', v:[
        'Verificar o que são Autômatos Finitos e qual a sua importância no reconhecimento de Strings e em outras aplicações computacionais;',
        'Definir o que são Autômatos Finitos Determinísticos e quais as suas restrições;',
        'Verificar o que são Diagramas de Transições e Tabelas de Transições para representar Autômatos.'
      ]}
    ]},

    { id:'p2a-1', num:'2.6', titulo:'Autômatos Finitos', blocos:[
      {t:'p', v:'O <b>Autômato Finito</b> (ou <i>Máquina de Estados Finitos</i>) é um modelo computacional e também um <b>mecanismo de reconhecimento</b> de caráter gráfico. Um autômato verifica se uma palavra <i>w</i> pertence a uma linguagem <i>L</i>.'},
      {t:'p', v:'O exemplo mais simples é o interruptor liga/desliga: dois estados e uma transição “pressionar” para cada lado.'},
      {t:'svg', v:`<svg viewBox="0 0 360 130" role="img" aria-label="Interruptor liga/desliga como autômato" style="font-family:var(--mono);font-size:12px">
<defs><marker id="p2sI" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<g stroke="currentColor" fill="none" stroke-width="1.6">
<line x1="10" y1="62" x2="50" y2="62" marker-end="url(#p2sI)"/>
<circle cx="90" cy="62" r="38"/>
<circle cx="270" cy="62" r="38"/>
<path d="M120 44 Q180 -6 240 44" marker-end="url(#p2sI)"/>
<path d="M240 80 Q180 130 120 80" marker-end="url(#p2sI)"/>
</g>
<g fill="currentColor" text-anchor="middle">
<text x="90" y="66">desligado</text>
<text x="270" y="66">ligado</text>
<text x="180" y="12">pressionar</text>
<text x="180" y="122">pressionar</text>
</g></svg>`, cap:'Interruptor liga/desliga: círculos são os estados e arcos são as alterações de um estado para outro.'},
      {t:'h3', v:'Onde a Teoria de Autômatos é aplicada'},
      {t:'ul', v:[
        'Construção de softwares para projetar e verificar o <b>comportamento de circuitos digitais</b>;',
        'Softwares para examinar <b>grandes corpos de texto</b>;',
        'Verificação de sistemas com um <b>número fixo de estados</b> distintos (ex.: protocolos de comunicação);',
        'Principalmente, na construção de <b>Analisadores Léxicos</b>, para dividir o texto de entrada em unidades lógicas (identificadores, palavras-chave etc.).'
      ]},
      {t:'h3', v:'As três partes de um autômato'},
      {t:'cards', v:[
        {n:'1', ico:'📼', t:'Fita de entrada', d:'Contém a informação a ser processada. É finita, dividida em células que armazenam um símbolo de um alfabeto de entrada. Não é possível gravar sobre a fita, pois a palavra ocupa toda ela.'},
        {n:'2', ico:'🎛️', t:'Unidade de controle', d:'Indica o <b>estado atual</b>. Possui uma cabeça de leitura que acessa uma célula por vez: começa na célula mais à esquerda e, após cada leitura, move-se uma célula para a direita.'},
        {n:'3', ico:'➡️', t:'Função de transição', d:'Comanda a leitura dos símbolos e define o estado da máquina. É uma <b>função parcial</b>: dependendo do estado atual e do símbolo lido, determina o novo estado.'}
      ]},
      {t:'table', head:['Tipo','O que acontece ao ler um símbolo','Onde é visto'], rows:[
        ['<b>AFD</b> (DFA)','assume um <b>único</b> estado bem determinado','este capítulo (§2.7)'],
        ['<b>AFN</b> (NFA)','assume um <b>conjunto</b> de estados alternativos','Parte 3 (§2.10)'],
        ['<b>AFN-ε</b>','assume um conjunto de estados, mesmo sem ler símbolo','Parte 3 (§2.10)']
      ]},
      {t:'note', v:'Resumindo: os autômatos finitos são <b>reconhecedores</b>. Eles dizem simplesmente “sim” ou “não” para cada cadeia de caracteres de entrada. Os três tipos reconhecem as linguagens regulares descritas por Expressões Regulares.'}
    ]},

    { id:'p2a-2', num:'2.7', titulo:'Autômato Finito Determinístico (AFD)', blocos:[
      {t:'p', v:'Um <b>AFD</b> (ou <i>DFA</i>, em inglês) é composto pela quíntupla:'},
      {t:'code', lang:'text', v:'A = (Q, Σ, δ, q0, F)'},
      {t:'table', head:['Componente','O que é'], rows:[
        ['<b>A</b>','nome do autômato'],
        ['<b>Q</b>','conjunto de estados'],
        ['<b>Σ</b>','conjunto de símbolos de entrada (alfabeto)'],
        ['<b>δ</b>','função de transição'],
        ['<b>q0</b>','estado inicial'],
        ['<b>F</b>','conjunto de estados de aceitação (ou os estados onde pode acontecer uma finalização)']
      ]},
      {t:'note', v:'<b>Restrição do determinismo:</b> para cada estado e cada símbolo existe <b>uma única</b> transição. Dada uma entrada, deve existir sempre um único próximo estado.'},
      {t:'h3', v:'Exemplo de reconhecimento: SUMMEROF69'},
      {t:'p', v:'Autômato de dois estados que reconhece identificadores: começa com letra e continua com qualquer sequência de letras ou dígitos. O estado 1 é o inicial; ao ler uma letra, vai para o estado 2, que é de aceitação e permanece nele com letras ou dígitos.'},
      {t:'svg', v:`<svg viewBox="0 0 340 120" role="img" aria-label="AFD que reconhece identificadores" style="font-family:var(--mono);font-size:12px">
<defs><marker id="p2sA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<g stroke="currentColor" fill="none" stroke-width="1.6">
<line x1="10" y1="80" x2="47" y2="80" marker-end="url(#p2sA)"/>
<circle cx="80" cy="80" r="30"/>
<line x1="110" y1="80" x2="218" y2="80" marker-end="url(#p2sA)"/>
<circle cx="250" cy="80" r="30"/>
<circle cx="250" cy="80" r="25"/>
<path d="M236 54 C220 18, 280 18, 264 54" marker-end="url(#p2sA)"/>
</g>
<g fill="currentColor" text-anchor="middle">
<text x="80" y="84">1</text>
<text x="250" y="84" font-weight="700">2</text>
<text x="164" y="71">letra</text>
<text x="250" y="18">letra, dígito</text>
</g></svg>`, cap:'AFD: começa com letra e segue com letras ou dígitos. O estado 2 é de aceitação (círculo duplo).'},
      {t:'p', v:'A listagem da sequência de estados e transições mostra o processo de reconhecimento da cadeia <code>SUMMEROF69</code>:'},
      {t:'code', lang:'text', v:'1 --S--> 2 --U--> 2 --M--> 2 --M--> 2 --E--> 2 --R--> 2 --O--> 2 --F--> 2 --6--> 2 --9--> 2   (aceita)'}
    ]},

    { id:'p2a-3', num:'2.7.1', titulo:'Diagrama de transição', blocos:[
      {t:'p', v:'Um diagrama de transições para um AFD <i>A = (Q, Σ, δ, q0, F)</i> é um grafo definido assim:'},
      {t:'ol', v:[
        'para cada estado em Q existe um nó correspondente;',
        'para cada estado q em Q e cada símbolo de entrada a em Σ, se δ(q, a) = p, há um arco do nó q para o nó p, rotulado por a;',
        'existe uma seta no estado inicial q0, identificada como “Início”, que não tem origem em nenhum nó;',
        'os nós dos estados de aceitação são marcados por um <b>círculo duplo</b>; os demais estados têm um único círculo.'
      ]},
      {t:'note', v:'Se não existe seta para o símbolo lido a partir do estado atual, a cadeia é rejeitada.'}
    ]},

    { id:'p2a-4', num:'2.7.2', titulo:'Tabela de transição', blocos:[
      {t:'p', v:'A <b>tabela de transição</b> é uma representação convencional e tabular da função δ:'},
      {t:'ul', v:[
        'as <b>linhas</b> correspondem aos estados;',
        'as <b>colunas</b> correspondem às entradas (símbolos);',
        'a <b>seta</b> (<code>-&gt;</code>) indica o estado inicial;',
        'o <b>asterisco</b> (<code>*</code>) indica o(s) estado(s) de aceitação.'
      ]},
      {t:'p', v:'Exemplo do material (diagrama de três estados, com o estado q2 de aceitação que repete o símbolo c):'},
      {t:'table', head:['Estado','a','b','c'], rows:[
        ['-&gt; q0','q1','—','—'],
        ['q1','—','q0','q2'],
        ['* q2','—','—','q2']
      ]}
    ]},

    { id:'p2a-5', num:'2.7.3', titulo:'Exemplos resolvidos (AFD)', blocos:[
      {t:'h3', v:'Exemplo 1 — identificadores (letra seguida de letras ou dígitos)'},
      {t:'p', v:'Para o autômato do SUMMEROF69, extraia: (A) a quíntupla e (B) a tabela de transição.'},
      {t:'ul', v:[
        '<b>Q</b> = {1, 2}',
        '<b>Σ</b> = {letra, dígito}',
        '<b>q0</b> = 1',
        '<b>F</b> = {2}',
        '<b>δ</b>: δ(1, letra) = 2; δ(2, letra) = 2; δ(2, dígito) = 2. As demais transições não existem (rejeição).'
      ]},
      {t:'table', head:['Estado','letra','dígito'], rows:[
        ['-&gt; 1','2','—'],
        ['* 2','2','2']
      ]},

      {t:'h3', v:'Exemplo 2 — inteiros e números com casas decimais (77, 3.14, 360.5)'},
      {t:'p', v:'Construa um AFD M que reconheça números inteiros e números com casas decimais. Aqui exige-se pelo menos um dígito antes e depois do ponto. Solução: <b>Q</b> = {q0, q1, q2, q3}, <b>Σ</b> = {dígito, “.”}, <b>q0</b> inicial, <b>F</b> = {q1, q3}.'},
      {t:'table', head:['Estado','dígito','.'], rows:[
        ['-&gt; q0','q1','—'],
        ['* q1','q1','q2'],
        ['q2','q3','—'],
        ['* q3','q3','—']
      ]},
      {t:'p', v:'Testes: <code>77</code> → q0, q1, q1 (aceita). <code>3.14</code> → q0, q1, q2, q3, q3 (aceita). <code>3.</code> → q0, q1, q2 (termina em q2, que não é de aceitação: rejeita). <code>.5</code> → não existe transição de q0 com “.”: rejeita.'},

      {t:'h3', v:'Exemplo 3 — duas linguagens'},
      {t:'p', v:'<b>L1</b> = { x ∈ {0,1}* | qualquer 0 em x é seguido por pelo menos um 1 }. Exemplos: 01, 1111, 011101.'},
      {t:'note', v:'<b>Interpretação usada:</b> cada 0 deve ser imediatamente seguido por um 1. Assim, “00” não pode aparecer e a cadeia não pode terminar em 0. A cadeia vazia é aceita.'},
      {t:'table', head:['Estado','0','1'], rows:[
        ['-&gt; * qA','qB','qA'],
        ['qB','qD','qA'],
        ['qD (erro)','qD','qD']
      ]},
      {t:'p', v:'<b>L2</b> = { x ∈ {a,b}* | x contém três a’s consecutivos }. Exemplos: aaa, baaab, bbaaa.'},
      {t:'table', head:['Estado','a','b'], rows:[
        ['-&gt; q0','q1','q0'],
        ['q1','q2','q0'],
        ['q2','q3','q0'],
        ['* q3','q3','q3']
      ]}
    ]},

    { id:'p2a-6', num:'2.8', titulo:'A ferramenta JFLAP', blocos:[
      {t:'p', v:'O <b>JFLAP</b> (<i>Java Formal Languages and Automata Package</i>) é um software educacional interativo, escrito em Java, para realizar experimentos com Linguagens Formais e Autômatos. Permite desenhar autômatos, simular cadeias e converter entre formalismos.'},
      {t:'p', v:'Download e tutoriais: <a href="http://www.jflap.org/" target="_blank" rel="noopener">jflap.org</a>.'},
      {t:'note', v:'Use o JFLAP para conferir os seus diagramas: desenhe o autômato, teste cadeias e compare com a tabela de transição que você montou.'}
    ]}
  ]
},

/* ===================== CAPÍTULO 2 — PARTE 3 ===================== */
{
  id:'p2-cap2b',
  titulo:'Cap. 2 — Análise Léxica (Parte 3)',
  subtitulo:'Autômatos finitos não determinísticos (AFN), ε-transições, Construção de Thompson e transformação de AFN em AFD.',
  secoes:[
    { id:'p2b-obj', num:'', titulo:'Objetivos do capítulo', blocos:[
      {t:'ul', v:[
        'Verificar o que são Autômatos Finitos Não-Determinísticos (AFN) e compreender suas principais diferenças em relação aos AFDs;',
        'Verificar o que é a Construção de Thompson e como ela auxilia na construção de um AFN capaz de representar uma dada Expressão Regular (REGEX);',
        'Compreender como é possível transformar um AFN em um AFD.'
      ]}
    ]},

    { id:'p2b-1', num:'2.9', titulo:'Introdução: tokens que começam igual', blocos:[
      {t:'p', v:'Em uma linguagem de programação, cada token pode ser reconhecido pelo seu próprio AFD. Os tokens <code>!=</code>, <code>&lt;=</code> e <code>=</code> começam com caracteres diferentes, então podem ter estados iniciais distintos no autômato:'},
      {t:'table', head:['Lexema','Caminho no autômato','Retorna'], rows:[
        ['<code>!=</code>','início —!→ estado —=→ aceita','diferente'],
        ['<code>&lt;=</code>','início —&lt;→ estado —=→ aceita','menor ou igual'],
        ['<code>=</code>','início —=→ aceita','atribuição']
      ]},
      {t:'p', v:'Agora suponha vários tokens que começam com o mesmo caractere: <code>&lt;</code>, <code>&lt;=</code> e <code>&lt;&gt;</code>. Do estado inicial saem <b>três</b> arcos rotulados com o mesmo símbolo “&lt;”. Isso não se encaixa em um AFD, pois, dada uma entrada, deve existir sempre uma única transição para um novo estado.'},
      {t:'note', v:'<b>Como resolver?</b> Uma saída é <b>fatorar</b> o prefixo comum: depois de “&lt;” existe um único estado, e dele saem as transições para “=” e “&gt;”. Outra saída é aceitar o não determinismo (AFN) e depois converter o AFN em um AFD equivalente (§2.12).'},
      {t:'table', head:['Estado','&lt;','=','&gt;'], rows:[
        ['-&gt; q0','q1','—','—'],
        ['* q1 (menor)','—','q2','q3'],
        ['* q2 (menor ou igual)','—','—','—'],
        ['* q3 (diferente)','—','—','—']
      ]}
    ]},

    { id:'p2b-2', num:'2.9.1', titulo:'Determinismo × não determinismo', blocos:[
      {t:'p', v:'A <b>computação é determinista</b> quando, estando em um estado e lendo o próximo símbolo de entrada, sabe-se exatamente qual será o próximo estado. Ela é <b>não determinista</b> quando, nas mesmas condições, não se sabe exatamente qual será o próximo estado: a máquina pode assumir vários estados diferentes.'},
      {t:'table', head:['','DFA (AFD)','NFA (AFN)'], rows:[
        ['A partir de uma nova entrada','a saída já é previsível','pode-se ter várias saídas'],
        ['Tempo para reconhecer uma string','no geral, menor','no geral, maior'],
        ['Transições com vazio (ε)','não pode utilizar','pode utilizar'],
        ['Construção','é mais difícil de construir','é mais fácil de construir'],
        ['Relação entre os dois','todo DFA é um NFA','nem todo NFA é um DFA']
      ]}
    ]},

    { id:'p2b-3', num:'2.10', titulo:'Autômatos Finitos Não-Determinísticos (AFN)', blocos:[
      {t:'p', v:'A definição formal de um AFN é bastante parecida com a de um AFD. Ambos têm estados (Q), alfabeto de entrada (Σ), função de transição (δ), estado inicial (q0) e coleção de estados de aceitação (F). A diferença está no tipo da função de transição:'},
      {t:'ul', v:[
        '<b>AFD:</b> a função de transição recebe um estado e um símbolo e <b>retorna o próximo estado</b>;',
        '<b>AFN:</b> a função de transição recebe um estado e um símbolo e <b>retorna um conjunto</b> de um ou mais estados.'
      ]},
      {t:'code', lang:'text', v:'AFD:  δ : Q × Σ → Q\nAFN:  δ : Q × Σ → conjunto de estados'},
      {t:'h3', v:'Exemplo 2 — quíntupla de um AFN para (0|1)*01'},
      {t:'svg', v:`<svg viewBox="0 0 360 130" role="img" aria-label="AFN para (0|1)*01" style="font-family:var(--mono);font-size:12px">
<defs><marker id="p2sB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<g stroke="currentColor" fill="none" stroke-width="1.6">
<line x1="12" y1="80" x2="40" y2="80" marker-end="url(#p2sB)"/>
<circle cx="70" cy="80" r="30"/>
<circle cx="190" cy="80" r="30"/>
<circle cx="310" cy="80" r="30"/>
<circle cx="310" cy="80" r="25"/>
<line x1="100" y1="80" x2="160" y2="80" marker-end="url(#p2sB)"/>
<line x1="220" y1="80" x2="280" y2="80" marker-end="url(#p2sB)"/>
<path d="M58 52 C42 16, 98 16, 82 52" marker-end="url(#p2sB)"/>
</g>
<g fill="currentColor" text-anchor="middle">
<text x="70" y="84">1</text>
<text x="190" y="84">2</text>
<text x="310" y="84" font-weight="700">3</text>
<text x="70" y="20">0, 1</text>
<text x="130" y="72">0</text>
<text x="250" y="72">1</text>
</g></svg>`, cap:'AFN: no estado 1, com o símbolo 0, há duas possibilidades (continuar em 1 ou ir para 2).'},
      {t:'p', v:'O autômato tem <b>Q</b> = {1, 2, 3}, <b>Σ</b> = {0, 1}, <b>q0</b> = 1 e <b>F</b> = {3}. A função δ é:'},
      {t:'table', head:['Estado','0','1'], rows:[
        ['-&gt; 1','{1, 2}','{1}'],
        ['2','∅','{3}'],
        ['* 3','∅','∅']
      ]},

      {t:'h3', v:'Transições ε (movimentos vazios)'},
      {t:'p', v:'Uma extensão dos autômatos é a possibilidade de fazer transições sobre ε (cadeia vazia). Um AFN-ε pode fazer uma transição espontaneamente, sem receber símbolo de entrada. Cada ε encontrado ao longo do caminho é <b>invisível</b>: não contribui com nada para a cadeia formada.'},
      {t:'p', v:'O <b>ε-fecho</b> de um estado s é o conjunto de estados alcançáveis a partir de s por zero ou mais ε-transições. O ε-fecho de um estado sempre contém o próprio estado.'},
      {t:'h3', v:'Exemplo 8 — ε-fecho de cada estado do AFN-ε de a*'},
      {t:'p', v:'Transições: 1 —ε→ 2, 2 —a→ 3, 3 —ε→ 2, 3 —ε→ 4 e 1 —ε→ 4. Estado de aceitação: 4.'},
      {t:'table', head:['Estado s','ε-fecho(s)'], rows:[
        ['1','{1, 2, 4}'],
        ['2','{2}'],
        ['3','{2, 3, 4}'],
        ['4','{4}']
      ]},
      {t:'note', v:'Para achar o ε-fecho, siga apenas as setas ε, repetidamente, e inclua cada estado alcançado.'},

      {t:'h3', v:'Exemplo 4 — AFNs com 3 estados sobre Σ = {0,1}'},
      {t:'p', v:'Construa AFNs para: (A) {w | w começa com 1 e termina com 0}; (B) {w | w termina em 00}; (C) {w | w possui a substring 01}. Dica do material: os três podem ser resolvidos com 3 estados.'},
      {t:'table', head:['Linguagem','Transições','Estado final'], rows:[
        ['A) começa com 1 e termina com 0','q0 —1→ q1; q1 —0,1→ q1; q1 —0→ q2','q2'],
        ['B) termina em 00','q0 —0,1→ q0; q0 —0→ q1; q1 —0→ q2','q2'],
        ['C) contém 01','q0 —0,1→ q0; q0 —0→ q1; q1 —1→ q2; q2 —0,1→ q2','q2']
      ]}
    ]},

    { id:'p2b-4', num:'2.11', titulo:'Construção de Thompson', blocos:[
      {t:'p', v:'A <b>Construção de Thompson</b> permite criar um AFN-ε a partir de uma Expressão Regular. Os passos são: (1) constrói-se um AFN para cada subexpressão; (2) usam-se ε-transições para juntar cada pedaço da expressão e formar uma máquina correspondente à expressão toda; (3) cada operação da REGEX corresponde a uma forma de conectar os AFNs das subexpressões.'},
      {t:'h3', v:'2.11.1 Expressões regulares básicas'},
      {t:'table', head:['Expressão','Construção','Casa'], rows:[
        ['<b>r</b> (um símbolo do alfabeto)','inicial —r→ aceitação','um único caractere'],
        ['<b>ε</b>','inicial —ε→ aceitação','a cadeia vazia'],
        ['<b>Ø</b>','inicial e aceitação sem caminho entre elas','nenhuma cadeia']
      ]},
      {t:'h3', v:'2.11.2 Concatenação (rs)'},
      {t:'p', v:'O estado inicial de rs é o estado inicial de r, e o estado de aceitação de rs é o de s. O estado de aceitação de r é ligado ao estado inicial de s por uma ε-transição. Logo, L(rs) = L(r)·L(s).'},
      {t:'h3', v:'2.11.3 União (r|s)'},
      {t:'p', v:'É adicionado um novo estado inicial e um novo estado de aceitação, conectados por ε-transições: o novo inicial aponta por ε para o inicial de r e para o inicial de s; o fim de r e o fim de s apontam por ε para o novo estado de aceitação.'},
      {t:'h3', v:'2.11.4 Repetição (fecho de Kleene r*)'},
      {t:'p', v:'Para que a cadeia vazia seja aceita, insere-se uma ε-transição do novo estado inicial para o novo estado de aceitação. Além disso, o fim de r volta por ε ao início de r, permitindo repetir r. Assim, forma-se r*.'},
      {t:'h3', v:'2.11.4 Repetição positiva (r+)'},
      {t:'p', v:'A repetição aparece na nova ε-transição do estado de aceitação de r para o seu estado inicial, permitindo que a máquina de r seja percorrida uma ou mais vezes. Não são criados novos estados.'},
      {t:'note', v:'<b>Macete:</b> r* = r+ com a ε extra que aceita a cadeia vazia.'},

      {t:'h3', v:'Exemplo 5 — traduzir ab|a'},
      {t:'p', v:'Passos: (1) básicas <i>a</i> e <i>b</i>; (2) concatenação <i>ab</i>; (3) cópia da máquina de <i>a</i>; (4) união de 2 e 3. Resultado, com os estados numerados como no material:'},
      {t:'ul', v:[
        '1 —ε→ 2; 2 —a→ 3; 3 —ε→ 4; 4 —b→ 5; 5 —ε→ 8 (caminho de <i>ab</i>);',
        '1 —ε→ 6; 6 —a→ 7; 7 —ε→ 8 (caminho de <i>a</i>).',
        'Estado inicial 1, estado de aceitação 8.'
      ]},

      {t:'h3', v:'Exemplo 6 — traduzir letra(letra|dígito)*'},
      {t:'p', v:'Passos: (1) básicas <i>letra</i> e <i>dígito</i>; (2) união <i>letra | dígito</i>; (3) fecho de (2); (4) cópia de <i>letra</i>; (5) concatenação de 4 com 2. O AFN-ε resultante tem estado inicial 1 e estado de aceitação 10.'}
    ]},

    { id:'p2b-5', num:'2.12', titulo:'Transformação AFN → AFD', blocos:[
      {t:'p', v:'Um AFN pode ser transformado em um AFD equivalente. Dois autômatos são equivalentes quando aceitam a mesma linguagem.'},
      {t:'h3', v:'2.12.1 AFN sem ε-transições → AFD (8 passos)'},
      {t:'ol', v:[
        'Construir a tabela de transições do AFN;',
        'Construir a tabela de transições do AFD pelo produto cartesiano dos estados do AFN, incluindo como último conjunto o vazio. Sempre existirão 2<sup>k</sup> combinações, onde k é o número de estados do AFN;',
        'Indicar todos os conjuntos que contêm um estado de aceitação do AFN: são candidatos a estados de aceitação do AFD;',
        'Verificar a ocorrência de cada conjunto em relação a cada símbolo e colocar como resultado o conjunto correspondente. Quando houver mais de um elemento, o resultado é a união das transições;',
        'Eliminar as linhas de estados inacessíveis (nenhuma transição chega até eles);',
        'Montar o AFD a partir da tabela do passo 5;',
        'Eliminar os estados que não possuem saída para outro estado e não são finais;',
        'Testar se as entradas válidas do AFN também são válidas no AFD resultante.'
      ]},
      {t:'p', v:'<b>Exemplo 7 (1ª parte):</b> AFN com estados q0, q1, q2 (q2 de aceitação), transições: q0 —a→ {q1, q2}; q1 —a→ {q2}; q1 —b→ {q0, q2}; q2 —a→ {q2}; q2 —b→ {q0}.'},
      {t:'table', head:['Estado do AFD','Conjunto','a','b'], rows:[
        ['-&gt; S0','{q0}','S5','S7'],
        ['* S2','{q2}','S2','S0'],
        ['* S4','{q0, q2}','S5','S0'],
        ['* S5','{q1, q2}','S2','S4'],
        ['S7','∅','S7','S7']
      ]},
      {t:'p', v:'Os estados S1, S3 e S6 são inacessíveis e foram eliminados (passo 5). O estado S7 não tem saída para outro estado e não é final, então também sai (passo 7). O AFD final:'},
      {t:'table', head:['Estado','a','b'], rows:[
        ['-&gt; S0','S5','—'],
        ['* S2','S2','S0'],
        ['* S4','S5','S0'],
        ['* S5','S2','S4']
      ]},

      {t:'p', v:'<b>Exemplo 7 (2ª parte):</b> AFN com estado inicial e final q0; transições q0 —a→ q1; q1 —b→ q0; q1 —b→ q2; q2 —a→ q0. Subconjuntos encontrados: p0 = {q0}, p1 = {q1}, p2 = {q0, q2}, p3 = {q0, q1}.'},
      {t:'table', head:['Estado','a','b'], rows:[
        ['-&gt; * p0','p1','—'],
        ['p1','—','p2'],
        ['* p2','p3','—'],
        ['* p3','p1','p2']
      ]},

      {t:'h3', v:'2.12.2 AFN com ε-transições → AFD (6 passos)'},
      {t:'ol', v:[
        'Computar o ε-fecho do estado inicial de M: ele passa a ser o estado inicial do AFD (M̄);',
        'Criar uma tabela com os fechamentos encontrados em M, dar um novo nome a cada fechamento (um novo estado do AFD) e mostrar as saídas para todas as entradas;',
        'Para cada conjunto S e cada símbolo a, calcular S<sub>a</sub> = {t | existe s em S com transição de s para t em a} e, depois, o ε-fecho de S<sub>a</sub>;',
        'Repetir o processo até que novos estados e transições não sejam mais criados;',
        'Marcar como aceitáveis os conjuntos que contêm um estado de aceitação de M;',
        'Desenhar o AFD resultante.'
      ]},
      {t:'p', v:'<b>Exemplo 8 (conversão):</b> AFN-ε do ε-fecho acima (estados 1 a 4, inicial 1, final 4). Passo 1: ε-fecho(1) = {1, 2, 4} = A. Em A, com “a”: 2 vai para 3, e ε-fecho({3}) = {2, 3, 4} = B. Em B, com “a”: 2 vai para 3 de novo, e o resultado é B. Nenhum estado novo surge. Como A e B contêm o 4, ambos são de aceitação.'},
      {t:'table', head:['Conjunto do AFN-ε','Estado do AFD','a'], rows:[
        ['{1, 2, 4}','-&gt; * A','B'],
        ['{2, 3, 4}','* B','B']
      ]},
      {t:'p', v:'<b>Exemplo 9:</b> AFN-ε com inicial 1 e final 8: 1 —ε→ 2; 1 —ε→ 6; 2 —a→ 3; 3 —ε→ 4; 4 —b→ 5; 5 —ε→ 8; 6 —a→ 7; 7 —ε→ 8. Passos:'},
      {t:'ul', v:[
        'ε-fecho(1) = {1, 2, 6} = <b>A</b> (inicial).',
        'Em A com “a”: 2 vai para 3 e 6 vai para 7, e os ε-fechos dão {3, 4, 7, 8} = <b>B</b> (contém o 8: aceitação).',
        'Em B com “b”: 4 vai para 5, e o ε-fecho dá {5, 8} = <b>C</b> (contém o 8: aceitação).',
        'Em C não há transições. Em B com “a” não há transições, e em A com “b” também não.'
      ]},
      {t:'table', head:['Estado','a','b'], rows:[
        ['-&gt; A','B','—'],
        ['* B','—','C'],
        ['* C','—','—']
      ]}
    ]}
  ]
},

/* ===================== CAPÍTULO 3 ===================== */
{
  id:'p2-cap3',
  titulo:'Cap. 3 — Análise Sintática',
  subtitulo:'O papel do analisador sintático, gramáticas livres de contexto, derivações e árvores de derivação.',
  secoes:[
    { id:'p2c-obj', num:'', titulo:'Objetivos do capítulo', blocos:[
      {t:'ul', v:[
        'Verificar qual a função de um Analisador Sintático no processo de compilação;',
        'Verificar o que são Gramáticas Livres de Contexto e como elas podem auxiliar na análise sintática de uma Linguagem de Programação;',
        'Estudar o que são Árvores Sintáticas e como elas podem ser construídas.'
      ]}
    ]},

    { id:'p2c-1', num:'3.1', titulo:'Introdução', blocos:[
      {t:'p', v:'A <b>Análise Sintática</b> tem por função determinar se a sintaxe (ou estrutura) do programa está correta.'},
      {t:'p', v:'O analisador sintático recebe do analisador léxico uma cadeia de tokens que representa o programa fonte e verifica se essa cadeia pertence à linguagem gerada pela gramática. Para programas bem formados, ele constrói uma <b>árvore de derivação</b> e a passa para o restante do front-end.'},
      {t:'flowh', v:['Programa fonte','→ tokens','Analisador Léxico','→ token','Analisador Sintático','→ árvore de derivação','Restante do Front-End','→','Representação intermediária']},
      {t:'h3', v:'Exemplo'},
      {t:'code', lang:'programa', v:'if x == y then return 1 else return 2 end'},
      {t:'code', lang:'tokens', v:'IF ID EQ ID THEN RETURN NUM ELSE RETURN NUM END'},
      {t:'code', lang:'árvore', v:'if\n├── Eq\n│   ├── Id(x)\n│   └── Id(y)\n├── Bloco\n│   └── Return\n│       └── Num(1)\n└── Bloco\n    └── Return\n        └── Num(2)'},
      {t:'p', v:'Nem todas as sequências de tokens são programas válidos. Por isso, o analisador sintático precisa de:'},
      {t:'ol', v:[
        'uma <b>linguagem para descrever</b> as sequências válidas de tokens e a estrutura do programa;',
        'um <b>método</b> para distinguir sequências válidas de inválidas e extrair a estrutura das válidas;',
        'uma forma de analisar a estrutura da linguagem de programação de modo <b>recursivo</b>.'
      ]},
      {t:'note', v:'Para resolver esses problemas, utilizamos as chamadas <b>Gramáticas Livres de Contexto</b>.'}
    ]},

    { id:'p2c-2', num:'3.2', titulo:'Gramática Livre de Contexto (GLC)', blocos:[
      {t:'p', v:'A sintaxe de uma linguagem é dada pelas regras gramaticais de uma <b>Gramática Livre de Contexto</b>: uma especificação para a estrutura sintática de uma Linguagem de Programação. Também podem ser usadas para representar subconjuntos de linguagens naturais, como no exemplo do material:'},
      {t:'code', lang:'gramática', v:'<frase> -> <sujeito> <verbo> <predicado>\n<sujeito> -> O aluno\n<verbo> -> estudou\n<predicado> -> uma matéria <adjetivo>\n<adjetivo> -> fácil\n<adjetivo> -> difícil'},
      {t:'h3', v:'Definição: G = (T, N, S, P)'},
      {t:'p', v:'Uma GLC é definida pela quádrupla <b>G = {T, N, S, P}</b>:'},
      {t:'table', head:['Componente','O que é','Exemplo'], rows:[
        ['<b>T</b> — símbolos terminais','símbolos básicos a partir dos quais as cadeias são formadas; são os primeiros componentes dos tokens gerados pelo analisador léxico','O aluno, estudou, fácil, +, (, id'],
        ['<b>N</b> — símbolos não terminais','variáveis sintáticas (partes que se modificam recursivamente); impõem uma estrutura hierárquica à linguagem','&lt;sujeito&gt;, &lt;verbo&gt;, E, T, F'],
        ['<b>S</b> — símbolo inicial','um não terminal distinguido; o conjunto de cadeias que ele representa é a linguagem gerada pela gramática','&lt;frase&gt; ou E'],
        ['<b>P</b> — produções','especificam como terminais e não terminais podem ser combinados para formar cadeias','&lt;frase&gt; -&gt; &lt;sujeito&gt; &lt;verbo&gt; &lt;predicado&gt;']
      ]},
      {t:'p', v:'Cada produção tem uma <b>cabeça</b> (um não terminal, do lado esquerdo) e um <b>corpo</b> (zero ou mais terminais e não terminais). O símbolo de produção pode ser escrito como <code>-&gt;</code>, <code>:</code> ou <code>:=</code>.'},
      {t:'h3', v:'Convenções de notação'},
      {t:'table', head:['Tipo','Convenção','Exemplos'], rows:[
        ['Terminais','letras minúsculas do início do alfabeto, operadores, pontuação, dígitos e tokens (id, if etc.)','a, b, c, +, *, (, ), id'],
        ['Não terminais','letras maiúsculas do início do alfabeto; a letra <b>S</b> indica o símbolo inicial. Em linguagens de programação, nomes em minúsculo também são usados','A, B, C, S, exp, termo']
      ]},
      {t:'h3', v:'Exemplo 1 — símbolos de uma gramática de expressões'},
      {t:'code', lang:'gramática', v:'exp -> exp + termo | exp - termo | termo\ntermo -> termo * fator | termo / fator | fator\nfator -> ( exp ) | id'},
      {t:'ul', v:[
        '<b>Terminais:</b> <code>+, -, *, /, (, ), id</code>',
        '<b>Não terminais:</b> <code>exp, termo, fator</code>',
        '<b>Inicial:</b> <code>exp</code>'
      ]},
      {t:'h3', v:'Exemplo 2 — reescrita compacta'},
      {t:'p', v:'Usando as convenções acima, a mesma gramática fica:'},
      {t:'code', lang:'gramática', v:'E -> E+T | E-T | T\nT -> T*F | T/F | F\nF -> (E) | id'}
    ]},

    { id:'p2c-3', num:'3.2.2', titulo:'Derivação', blocos:[
      {t:'p', v:'As cadeias gramaticais determinam as cadeias legais de símbolos por meio da <b>derivação</b>. O processo de derivação é uma <b>sequência de substituições</b> de não terminais pelo corpo de uma de suas produções: a partir do símbolo inicial, a cada passo substitui-se um não terminal, e uma única substituição é realizada por passo.'},
      {t:'note', v:'As <b>regras</b> definem a gramática (com a seta de produção), enquanto os <b>passos de derivação</b> constroem a cadeia por substituição. No material, as derivações usam <code>-&gt;</code> para mostrar cada passo.'},
      {t:'h3', v:'Derivação mais à esquerda × mais à direita'},
      {t:'ul', v:[
        '<b>Derivação mais à esquerda:</b> em cada forma, o não terminal mais à esquerda é sempre o escolhido;',
        '<b>Derivação mais à direita:</b> em cada forma, o não terminal mais à direita é sempre o escolhido.'
      ]},

      {t:'h3', v:'Exemplo 3 — derivação de (34 - 3) * 42'},
      {t:'p', v:'A expressão corresponde à cadeia com sete tokens <code>(num - num) * num</code>. Regras: <code>exp -> exp op exp | ( exp ) | num</code> e <code>op -> + | - | *</code>.'},
      {t:'code', lang:'derivação', v:'(1) exp -> exp op exp          [exp -> exp op exp]\n(2)     -> exp op num          [exp -> num]\n(3)     -> exp * num          [op -> *]\n(4)     -> ( exp ) * num      [exp -> ( exp )]\n(5)     -> ( exp op exp ) * num [exp -> exp op exp]\n(6)     -> ( exp op num ) * num [exp -> num]\n(7)     -> ( exp - num ) * num  [op -> -]\n(8)     -> ( num - num ) * num  [exp -> num]'},

      {t:'h3', v:'Exemplo 4 — derivação de -(id + id)'},
      {t:'p', v:'Gramática: <code>E -> E O E | -E | ( E ) | id</code> e <code>O -> + | - | *</code>. Derivações mais à esquerda e mais à direita:'},
      {t:'table', head:['Passo','Mais à esquerda','Mais à direita'], rows:[
        ['1','E ⇒ -E','E ⇒ -E'],
        ['2','⇒ -(E)','⇒ -(E)'],
        ['3','⇒ -(E O E)','⇒ -(E O E)'],
        ['4','⇒ -(id O E)','⇒ -(E O id)'],
        ['5','⇒ -(id + E)','⇒ -(E + id)'],
        ['6','⇒ -(id + id)','⇒ -(id + id)']
      ]},

      {t:'h3', v:'Exemplo 5 — quais afirmações são verdadeiras?'},
      {t:'p', v:'Considere a gramática abaixo, em que S, A e B são não terminais, 0 e 1 são terminais e ε é a cadeia vazia:'},
      {t:'code', lang:'gramática', v:'S -> 1S | 0A | ε\nA -> 1S | 0B | ε\nB -> 1S | ε'},
      {t:'ul', v:[
        'I. Nas cadeias geradas, o último símbolo é 1.',
        'II. O número de zeros consecutivos nas cadeias geradas é, no máximo, dois.',
        'III. O número de uns em cada cadeia gerada é maior que o número de zeros.',
        'IV. Nas cadeias geradas, todos os uns estão à esquerda de todos os zeros.'
      ]},
      {t:'note', v:'<b>Resposta: apenas a II é verdadeira.</b> (I) falsa: “0” é gerado (S ⇒ 0A ⇒ 0), e a cadeia vazia também. (II) verdadeira: de S vai-se a 0A e de A a 0B; B só gera 1S ou ε, nunca 0, então “000” não é gerado. (III) falsa: “0” tem um zero e nenhum um. (IV) falsa: “01” é gerada (S ⇒ 0A ⇒ 01S ⇒ 01).'}
    ]},

    { id:'p2c-4', num:'3.3', titulo:'Árvores de Derivação', blocos:[
      {t:'p', v:'Uma derivação proporciona um método para a construção de uma cadeia específica de símbolos terminais a partir de um símbolo não terminal inicial. Existem várias formas de derivar a mesma cadeia, então usamos uma representação que abstrai as características de uma derivação: a <b>Árvore de Análise Sintática</b> ou <b>Árvore de Derivação</b>.'},
      {t:'note', v:'Uma Árvore de Derivação é uma <b>representação gráfica</b> de uma derivação que filtra a ordem em que as produções são aplicadas para substituir os não terminais.'},
      {t:'h3', v:'3.3.1 Regras das árvores de derivação'},
      {t:'ol', v:[
        'Cada nó interior representa a aplicação de uma produção;',
        'Cada nó interior é rotulado com o não terminal A do lado esquerdo da produção;',
        'Os filhos de um nó são rotulados, da esquerda para a direita, pelos símbolos do corpo da produção pela qual esse A foi substituído;',
        'As folhas são os terminais (ou ε) da cadeia.'
      ]},

      {t:'h3', v:'Exemplo 6 — árvore de num + num'},
      {t:'p', v:'Regras: <code>exp -> exp op exp | ( exp ) | num</code> e <code>op -> + | - | *</code>. Derivação: (1) exp → exp op exp; (2) → num op exp; (3) → num + exp; (4) → num + num.'},
      {t:'code', lang:'árvore', v:'exp (1)\n├── exp (2) ── num\n├── op  (3) ── +\n└── exp (4) ── num'},
      {t:'p', v:'Montagem: 1º passo, nó raiz; 2º passo, filho mais à esquerda; 3º passo, filho central; 4º passo, filho mais à direita.'},

      {t:'h3', v:'Exemplo 7 — árvore de -(id + id)'},
      {t:'p', v:'Usando a derivação mais à esquerda do Exemplo 4, com os passos numerados:'},
      {t:'code', lang:'árvore', v:'E (1)\n├── -\n└── E (2)\n    ├── (\n    ├── E (3)\n    │   ├── E (4) ── id\n    │   ├── O (5) ── +\n    │   └── E (6) ── id\n    └── )'},

      {t:'h3', v:'Exemplo 8 — árvores à esquerda e à direita de (num - num) * num'},
      {t:'p', v:'Gramática: <code>E -> E O E | -E | ( E ) | num</code> e <code>O -> + | - | *</code>. Derivação mais à esquerda:'},
      {t:'code', lang:'árvore', v:'E (1)\n├── E (2)\n│   ├── (\n│   ├── E (3)\n│   │   ├── E (4) ── num\n│   │   ├── O (5) ── -\n│   │   └── E (6) ── num\n│   └── )\n├── O (7) ── *\n└── E (8) ── num'},
      {t:'p', v:'Na derivação mais à direita, a numeração dos passos muda, mas a <b>forma da árvore</b> e os rótulos são os mesmos. Ou seja, uma árvore corresponde a muitas derivações: a árvore mostra a estrutura, não a ordem das substituições.'},

      {t:'h3', v:'Enumeração em pré-ordem'},
      {t:'p', v:'É possível tornar a correspondência explícita enumerando os nós internos da árvore pelo número do passo em que o não terminal associado é substituído na derivação. Essa enumeração é uma enumeração em <b>pré-ordem</b> (raiz, esquerda, direita).'}
    ]}
  ]
}

],
};
