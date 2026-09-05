/* =============================================================
   FORMULÁRIO / FOLHA DE CONSULTA
   Cards de referência rápida. Imprimível (Ctrl+P → PDF).
   Tipos de card: 'table' (head/rows) | 'list' (v) | 'kv' (v:[[chave,valor]])
   ============================================================= */

const FORMULARIO = { p1:[

{ id:'f-regex-op', ico:'⚙️', titulo:'Regex — operadores fundamentais', tipo:'table',
  head:['Símbolo','Nome','Significado'],
  rows:[
    ['|','União / alternância','Uma coisa <b>ou</b> outra'],
    ['ab','Concatenação','a seguido de b'],
    ['*','Fecho de Kleene','<b>Zero</b> ou mais ocorrências'],
    ['+','Fecho positivo','<b>Uma</b> ou mais ocorrências'],
    ['?','Opcional','<b>Zero ou uma</b> ocorrência'],
    ['.','Curinga','Um caractere <b>qualquer</b>'],
    ['( )','Agrupamento','Delimita a subexpressão'],
    ['ε','String vazia','Zero símbolos']
  ]},

{ id:'f-regex-prec', ico:'🔢', titulo:'Regex — precedência', tipo:'list',
  v:[
    '<b>1º</b> <code>*</code> (unário, mais alta) — associativo à esquerda',
    '<b>2º</b> concatenação — associativa à esquerda',
    '<b>3º</b> <code>|</code> (mais baixa) — associativo à esquerda',
    'Por isso <code>(a) | ((b)*(c))</code> = <code>a | b*c</code>',
    '⚠️ <code>abc?</code> = {ab, abc} — o <code>?</code> vale só para o <b>c</b>, não para o grupo'
  ]},

{ id:'f-regex-ext', ico:'🧰', titulo:'Regex — extensões', tipo:'table',
  head:['Expressão','Significado'],
  rows:[
    ['[ab]','“a” ou “b”'],
    ['[a-h]','de “a” até “h”'],
    ['[a-z] · [A-Z] · [0-9]','minúscula · maiúscula · dígito'],
    ['[a-zA-Z]','qualquer letra'],
    ['[^a-z]','tudo que <b>não</b> é minúscula'],
    ['[.]','o ponto <b>literal</b>'],
    ['[a-z-]','minúscula ou o literal “-” (hífen no fim)'],
    ['[a-z^]','minúscula ou o literal “^” (circunflexo fora do início)'],
    ['{m,n}','de m a n ocorrências'],
    ['{3}','exatamente 3'],
    ['{1,}','no mínimo 1'],
    ['{,5}','até 5']
  ]},

{ id:'f-regex-receitas', ico:'📖', titulo:'Regex — receitas prontas', tipo:'table',
  head:['Alvo','Expressão'],
  rows:[
    ['Identificador C','<code>[a-zA-Z_][a-zA-Z0-9_]*</code>'],
    ['Inteiro negativo','<code>-[0-9]+</code>'],
    ['Só vogais','<code>[aeiou]+</code>'],
    ['“Inatel” em qualquer caixa','<code>[Ii][Nn][Aa][Tt][Ee][Ll]</code>'],
    ['Usuário 3–15','<code>[a-zA-Z0-9]{3,15}</code>'],
    ['CEP','<code>[0-9]{5}-[0-9]{3}</code>'],
    ['E-mail gmail/yahoo','<code>[a-zA-Z0-9._%+-]+@(gmail|yahoo)[.]com</code>'],
    ['Hora 24h','<code>([01][0-9]|2[0-3]):[0-5][0-9]</code>'],
    ['Número sem sinal','<code>[0-9]+([.][0-9]+)?([eE][+-]?[0-9]+)?</code>']
  ]},

{ id:'f-teoria', ico:'Σ', titulo:'Teoria de linguagens', tipo:'kv',
  v:[
    ['Alfabeto (Σ)','Conjunto de símbolos <b>finito e não vazio</b>'],
    ['String','Cadeia finita de símbolos de um alfabeto'],
    ['ε','String vazia — zero símbolos'],
    ['|w|','Comprimento da string. |010111| = 6'],
    ['Σ*','Conjunto de <b>todas</b> as strings sobre Σ'],
    ['Linguagem','L ⊆ Σ* — conjunto de strings'],
    ['L ∪ M','União: está em L, em M, ou em ambas'],
    ['L.M','Concatenação: cada string de L colada a cada string de M'],
    ['L*','Fecho: qualquer número de strings de L concatenadas (inclui ε)']
  ]},

{ id:'f-tokens', ico:'🏷️', titulo:'Classes de token (convenção do material)', tipo:'table',
  head:['Sigla','Classe','Como reconhecer'],
  rows:[
    ['ID','Identificador','Nome criado pelo programador ou de biblioteca: <code>x1</code>, <code>printf</code>, <code>print</code>, <code>float</code>'],
    ['KW','Palavra-chave','Reservada da linguagem: <code>while</code>, <code>if</code>, <code>else</code>, <code>int</code>, <code>for</code>'],
    ['LT','Literal','Constante numérica ou texto entre aspas: <code>3.1416</code>, <code>"Inatel"</code>'],
    ['SP','Separador','<code>( ) { } [ ] ; , : .</code>'],
    ['OP','Operador','<code>= + - * / == != &lt;= &gt;= ++ -= &amp;&amp;</code>']
  ]},

{ id:'f-tokens-dicas', ico:'⚠️', titulo:'Pegadinhas da tokenização', tipo:'list',
  v:[
    '<code>printf</code>, <code>print</code>, <code>input</code>, <code>float</code> <b>não são</b> palavras-chave → são <b>ID</b>',
    '<code>=</code> é <b>operador</b> (atribuição), não separador',
    'Toda a cadeia entre aspas é <b>um único</b> literal — espaços e <code>%d</code> inclusos',
    '<b>Maior casamento possível:</b> <code>-=</code>, <code>++</code>, <code>&gt;=</code>, <code>==</code> são <b>um</b> token cada',
    'Chave/parêntese faltando é erro <b>sintático</b> — o analisador léxico não percebe',
    'O <code>:</code> do Python (fim do <code>while</code>) é <b>separador</b>'
  ]},

{ id:'f-fases', ico:'🔄', titulo:'Fases do compilador: entra → sai', tipo:'table',
  head:['#','Fase','Entrada → Saída'],
  rows:[
    ['1','Análise Léxica','caracteres → <b>tokens</b>'],
    ['2','Análise Sintática','tokens → <b>árvore sintática</b>'],
    ['3','Análise Semântica','árvore → árvore <b>anotada</b> (tipos, coerção)'],
    ['4','Ger. Cód. Intermediário','árvore → <b>código de três endereços</b>'],
    ['5','Otimização','código interm. → código interm. <b>melhor</b>'],
    ['6','Geração de Cód. Alvo','código interm. → <b>assembly</b>']
  ]},

{ id:'f-frontback', ico:'🧱', titulo:'Front-End × Back-End', tipo:'kv',
  v:[
    ['Front-End (Análise)','Fases <b>1 a 4</b> · depende da <b>linguagem-fonte</b>'],
    ['Back-End (Síntese)','Fases <b>5 e 6</b> · depende da <b>máquina alvo</b>'],
    ['Comuns a todas','Gerenciador da Tabela de Símbolos · Tratador de Erros'],
    ['Tratador de erros','Estratégias: <b>abortar</b> ou <b>recuperar</b>'],
    ['Tabela de símbolos','Guarda tipo, tamanho, escopo. Implementada com <b>hash</b>, <b>ABB</b>, pilhas/filas']
  ]},

{ id:'f-exemplo', ico:'🧪', titulo:'O exemplo que cai na prova', tipo:'list',
  v:[
    '<code>position = initial + rate * 60</code>',
    '<b>1. Léxica</b> → <code>⟨id,1⟩ ⟨=⟩ ⟨id,2⟩ ⟨+⟩ ⟨id,3⟩ ⟨*⟩ ⟨60⟩</code>',
    '<b>2. Sintática</b> → árvore com <code>=</code> na raiz',
    '<b>3. Semântica</b> → insere <code>inttofloat</code> sobre o 60 (coerção)',
    '<b>4. Intermediário</b> → <code>t1 = inttofloat(60)</code> · <code>t2 = id3 * t1</code> · <code>t3 = id2 + t2</code> · <code>id1 = t3</code>',
    '<b>5. Otimização</b> → <code>t1 = id3 * 60.0</code> · <code>id1 = id2 + t1</code>',
    '<b>6. Cód. Alvo</b> → <code>LDF R2,id3</code> · <code>MULF R2,R2,#60.0</code> · <code>LDF R1,id2</code> · <code>ADDF R1,R1,R2</code> · <code>STF id1,R1</code>'
  ]},

{ id:'f-aux', ico:'🔗', titulo:'Programas auxiliares', tipo:'kv',
  v:[
    ['Pré-processador','Apaga comentários, inclui arquivos (<code>#include</code>), substitui macros'],
    ['Compilador','Fonte modificado → assembly'],
    ['Montador (Assembler)','Assembly → <b>código de máquina relocável</b>'],
    ['Linker','Combina arquivos objeto em um <b>executável</b>'],
    ['Loader','Reúne os executáveis na <b>memória</b> para execução'],
    ['Bib. estáticas','Antes do compilador · <code>.h</code>, jars'],
    ['Bib. dinâmicas','Numa fase do compilador · <code>.lib</code>, <code>.dll</code> · <b>dependem do SO</b>']
  ]},

{ id:'f-propriedades', ico:'⭐', titulo:"8 propriedades das LP's", tipo:'table',
  head:['#','Propriedade','Favorece ↑ / Prejudica ↓'],
  rows:[
    ['1','Legibilidade','↑ simplicidade, estruturação · ↓ goto, sobrecarga de operadores'],
    ['2','Redigibilidade','↑ simplicidade, abstração · ↓ construções complexas, muitas primitivas'],
    ['3','Confiabilidade','↑ verificação de tipos, exceções · ↓ ações perigosas'],
    ['4','Eficiência','tempo de execução · ↓ verificação em tempo de execução'],
    ['5','Ortogonalidade','↑ poucas primitivas regulares · ↓ muitas exceções'],
    ['6','Reusabilidade','↑ subprogramas, bibliotecas, classes, APIs'],
    ['7','Modificabilidade','↑ constantes simbólicas, separação UI/lógica, TAD'],
    ['8','Portabilidade','↑ implementação híbrida, padronização']
  ]},

{ id:'f-paradigmas', ico:'🧭', titulo:'Paradigmas', tipo:'table',
  head:['Grupo','Paradigma','Ideia','Exemplos'],
  rows:[
    ['Imperativo','Estruturado','Blocos aninhados: sequência, seleção, iteração','PASCAL, C'],
    ['Imperativo','Orientado a Objetos','Abstração de dados; classes e objetos','Smalltalk, C++, Java'],
    ['Imperativo','Concorrente','Vários processos simultâneos (threads)','Ada, Java, C#'],
    ['Declarativo','Funcional','Composição e recursão de funções','LISP, Haskell'],
    ['Declarativo','Lógico','Fatos + regras + inferência','PROLOG'],
    ['—','Multiparadigma','Suporta mais de um paradigma','Scala']
  ]},

{ id:'f-geracoes', ico:'🕰️', titulo:'Gerações das linguagens', tipo:'kv',
  v:[
    ['1ª','Linguagem de máquina (0 e 1)'],
    ['2ª','Montagem — Assembly'],
    ['3ª','Alto nível <b>procedurais</b> (<i>how to do</i>) — C++, Java, Python'],
    ['4ª','Específicas <b>não procedurais</b> (<i>what to do</i>) — SQL, Cypher, MQL'],
    ['5ª','Lógica matemática / IA — Prolog, Mercury']
  ]},

{ id:'f-compint', ico:'⚖️', titulo:'Compilador × Interpretador × Híbrido', tipo:'table',
  head:['','Compilador','Interpretador','Híbrido'],
  rows:[
    ['Tradução','Programa inteiro, antes','Linha a linha, durante','Fonte → bytecode → VM'],
    ['Velocidade','Rápida','Depende do tamanho do programa','Intermediária'],
    ['Otimização','Sim','Não','Parcial'],
    ['<code>(B*C)</code> 3×','Calcula 1 vez (temporária)','Recalcula 3 vezes','—'],
    ['Exemplos','C, C++','JavaScript, Python, PHP, Ruby','Java']
  ]},

{ id:'f-glossario', ico:'🌐', titulo:'Glossário PT ↔ EN', tipo:'kv',
  v:[
    ['Análise Léxica','Lexical Analysis / Scanning'],
    ['Análise Sintática','Syntax Analysis / Parsing'],
    ['Análise Semântica','Semantic Analysis'],
    ['Árvore sintática','Syntax tree'],
    ['Código de três endereços','Three-address code'],
    ['Linguagem fonte / alvo','Source / Target language'],
    ['Montador','Assembler'],
    ['Tabela de símbolos','Symbol table'],
    ['Fecho de Kleene','Kleene closure'],
    ['Coerção','Coercion']
  ]}

], p2:[] };
