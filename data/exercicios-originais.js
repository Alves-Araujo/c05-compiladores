/* =============================================================
   EXERCÍCIOS ORIGINAIS DO MATERIAL  (Prova 1)
   Nada aqui é inventado: são os Exemplos 1 a 4 dos slides.
   Os gabaritos são a resolução dos exercícios propostos.

   Tipos: 'tokenize' | 'open' | 'regex'
   ============================================================= */

const EX_ORIGINAIS = { p1:[

/* ---------------- EXEMPLO 1 ---------------- */
{
  grupo:'Exemplo 1 — Listas de Tokens',
  fonte:'Cap. 2 · §2.3',
  enunciado:'Para os trechos de código a seguir, construa uma lista de Tokens para cada um deles. Use os nomes de token sugeridos: <b>ID</b> (identificadores), <b>KW</b> (palavras-chave), <b>LT</b> (literais), <b>SP</b> (separadores) e <b>OP</b> (operadores).',
  itens:[
  {
    id:'o-ex1a', tipo:'tokenize', titulo:'A) Código JAVA',
    dica:'Em Java, <code>{ } ( ) ; ,</code> são <b>separadores</b>; <code>=</code> é <b>operador</b> (de atribuição), não separador.',
    tokens:[
      {lex:'while',cls:'KW'},{lex:'(',cls:'SP'},{lex:'x1',cls:'ID'},{lex:'!=',cls:'OP'},{lex:'3',cls:'LT'},{lex:')',cls:'SP'},{lex:'{',cls:'SP'},{br:1},
      {lex:'if',cls:'KW'},{lex:'(',cls:'SP'},{lex:'i',cls:'ID'},{lex:'==',cls:'OP'},{lex:'j',cls:'ID'},{lex:')',cls:'SP'},{lex:'{',cls:'SP'},{br:1},
      {lex:'z',cls:'ID'},{lex:'=',cls:'OP'},{lex:'0',cls:'LT'},{lex:';',cls:'SP'},{br:1},
      {lex:'}',cls:'SP'},{lex:'else',cls:'KW'},{lex:'{',cls:'SP'},{br:1},
      {lex:'z',cls:'ID'},{lex:'=',cls:'OP'},{lex:'1',cls:'LT'},{lex:';',cls:'SP'},{br:1},
      {lex:'x1',cls:'ID'},{lex:'=',cls:'OP'},{lex:'x1',cls:'ID'},{lex:'+',cls:'OP'},{lex:'1',cls:'LT'},{lex:';',cls:'SP'},{br:1},
      {lex:'}',cls:'SP'}
    ],
    notas:[
      '<code>while</code>, <code>if</code> e <code>else</code> são palavras reservadas da linguagem → <b>KW</b>.',
      '<code>x1</code>, <code>i</code>, <code>j</code> e <code>z</code> são nomes criados pelo programador → <b>ID</b>.',
      '<code>3</code>, <code>0</code> e <code>1</code> são constantes numéricas → <b>LT</b>.',
      'O código do enunciado está com uma chave <code>}</code> a menos (falta fechar o <code>while</code>) — isso é um erro <b>sintático</b>, que o analisador léxico não detecta. Ele apenas entrega a lista de tokens.'
    ]
  },
  {
    id:'o-ex1b', tipo:'tokenize', titulo:'B) Código C++',
    dica:'<code>printf</code> não é palavra reservada de C/C++ — é o nome de uma função de biblioteca, ou seja, um identificador.',
    tokens:[
      {lex:'printf',cls:'ID'},{lex:'(',cls:'SP'},{lex:'"Valor de X: %d"',cls:'LT'},{lex:',',cls:'SP'},{lex:'x1',cls:'ID'},{lex:')',cls:'SP'},{lex:';',cls:'SP'}
    ],
    notas:[
      'Toda a cadeia entre aspas, incluindo o <code>%d</code> e os espaços, é <b>um único literal</b> (LT).',
      'A vírgula que separa os argumentos é um <b>separador</b> (SP).'
    ]
  },
  {
    id:'o-ex1c', tipo:'tokenize', titulo:'C) Código Python',
    dica:'Em Python 3, <code>print</code>, <code>input</code> e <code>float</code> são <b>funções embutidas</b> (built-ins), não palavras reservadas → ID. Já <code>while</code> é reservada → KW.',
    tokens:[
      {lex:'num',cls:'ID'},{lex:'=',cls:'OP'},{lex:'float',cls:'ID'},{lex:'(',cls:'SP'},{lex:'input',cls:'ID'},{lex:'(',cls:'SP'},{lex:'"Entre com um num:"',cls:'LT'},{lex:')',cls:'SP'},{lex:')',cls:'SP'},{br:1},
      {lex:'while',cls:'KW'},{lex:'num',cls:'ID'},{lex:'>',cls:'OP'},{lex:'0',cls:'LT'},{lex:':',cls:'SP'},{br:1},
      {lex:'num',cls:'ID'},{lex:'-=',cls:'OP'},{lex:'0.5',cls:'LT'},{br:1},
      {lex:'print',cls:'ID'},{lex:'(',cls:'SP'},{lex:'num',cls:'ID'},{lex:')',cls:'SP'}
    ],
    notas:[
      'O dois-pontos <code>:</code> que abre o bloco do <code>while</code> é um <b>separador</b>.',
      '<code>-=</code> é um <b>único</b> token de operador (atribuição composta) — o analisador léxico usa a regra do “maior casamento possível”, então não separa em <code>-</code> e <code>=</code>.',
      '<code>0.5</code> é um literal de ponto flutuante → <b>LT</b>.'
    ]
  }]
},

/* ---------------- EXEMPLO 2 ---------------- */
{
  grupo:'Exemplo 2 — Qual linguagem a REGEX expressa?',
  fonte:'Cap. 2 · §2.4',
  enunciado:'Considere o alfabeto Σ = {a, b, c}. Qual a linguagem expressa pelas seguintes expressões regulares? <br><span class="muted">Lembretes: <code>*</code> zero ou mais · <code>+</code> uma ou mais · <code>?</code> zero ou uma · <code>.</code> qualquer caractere · <code>|</code> alternância.</span>',
  itens:[
  { id:'o-ex2a', tipo:'open', titulo:'A) <code>a | b</code>',
    gabarito:'L = {a, b}. Uma única ocorrência: ou o caractere “a”, ou o caractere “b”. É a <b>união</b> de {a} com {b}. Note que ε <b>não</b> pertence a L.',
    chaves:[{k:'contém a', syn:['a']},{k:'contém b', syn:['b']},{k:'ideia de união / “ou”', syn:['uniao','união','ou ','alternancia','alternância','|']}] },
  { id:'o-ex2b', tipo:'open', titulo:'B) <code>(a | b)(a | b)</code>',
    gabarito:'L = {aa, ab, ba, bb}. Todas as strings de <b>exatamente 2 caracteres</b> formadas por “a” ou “b” (concatenação de duas uniões). O “c” nunca aparece.',
    chaves:[{k:'comprimento 2', syn:['2 caracteres','dois caracteres','tamanho 2','comprimento 2','duas']},{k:'aa/ab/ba/bb', syn:['aa','ab','ba','bb']}] },
  { id:'o-ex2c', tipo:'open', titulo:'C) <code>a*</code>',
    gabarito:'L = {ε, a, aa, aaa, aaaa, …}. Zero ou mais ocorrências de “a” — o <b>fecho de Kleene</b> de {a}. Inclui a string vazia ε.',
    chaves:[{k:'zero ou mais', syn:['zero ou mais','nenhuma ou','0 ou mais','fecho','kleene']},{k:'inclui ε', syn:['vazia','epsilon','ε','vazio']}] },
  { id:'o-ex2d', tipo:'open', titulo:'D) <code>(a | b)*</code>',
    gabarito:'L = todas as strings formadas <b>apenas</b> por “a” e “b”, em qualquer ordem e qualquer quantidade, incluindo ε: {ε, a, b, aa, ab, ba, bb, aab, …}. O “c” nunca aparece.',
    chaves:[{k:'qualquer combinação de a e b', syn:['qualquer','todas','combinac','combinaç','ordem','quantidade']},{k:'inclui ε', syn:['vazia','epsilon','ε','vazio','zero']}] },
  { id:'o-ex2e', tipo:'open', titulo:'E) <code>a | a*b</code>',
    gabarito:'Pela precedência (<code>*</code> &gt; concatenação &gt; <code>|</code>), lê-se <code>a</code> <b>ou</b> <code>(a*)b</code>. Logo L = {a} ∪ {b, ab, aab, aaab, …}: ou a string “a” sozinha, ou zero ou mais “a” seguidos de um único “b”.',
    chaves:[{k:'o caso “a” sozinho', syn:['a sozinho','apenas a','somente a','so o a','só o a','a  ','{a}']},{k:'zero ou mais a seguidos de b', syn:['seguido','seguidos','antes do b','terminad','acaba','zero ou mais']}] },
  { id:'o-ex2f', tipo:'open', titulo:'F) <code>(a | b)+c</code>',
    gabarito:'L = {ac, bc, aac, abc, bac, bbc, aaac, …}. <b>Uma ou mais</b> ocorrências de “a” ou “b” (em qualquer ordem), obrigatoriamente seguidas de um único “c” no fim. ε ∉ L e “c” sozinho ∉ L.',
    chaves:[{k:'uma ou mais de a/b', syn:['uma ou mais','pelo menos um','ao menos','1 ou mais','nao vazia','não vazia']},{k:'termina em c', syn:['seguid','termina','no fim','no final','depois','um c']}] },
  { id:'o-ex2g', tipo:'open', titulo:'G) <code>(a | b)ab</code>',
    gabarito:'L = {aab, bab}. Apenas duas strings: um “a” ou um “b”, seguido obrigatoriamente da sequência fixa “ab”.',
    chaves:[{k:'aab', syn:['aab']},{k:'bab', syn:['bab']}] },
  { id:'o-ex2h', tipo:'open', titulo:'H) <code>abc?</code>',
    gabarito:'L = {ab, abc}. O <code>?</code> se aplica <b>somente ao “c”</b> (zero ou uma ocorrência), e não ao grupo inteiro. O prefixo “ab” é obrigatório.',
    chaves:[{k:'ab', syn:['ab']},{k:'abc', syn:['abc']},{k:'o ? vale só para o c', syn:['so o c','só o c','apenas o c','somente o c','opcional']}] },
  { id:'o-ex2i', tipo:'open', titulo:'I) <code>a?bc.</code>',
    gabarito:'“a” opcional + “b” + “c” + <b>qualquer</b> caractere do alfabeto. Com Σ = {a,b,c}: L = {bca, bcb, bcc, abca, abcb, abcc} — 6 strings.',
    chaves:[{k:'a é opcional', syn:['opcional','zero ou uma','pode ou nao','pode ou não','com ou sem']},{k:'termina com qualquer caractere', syn:['qualquer caracter','qualquer caráct','qualquer símbolo','qualquer simbolo','qualquer um','ponto']}] },
  { id:'o-ex2j', tipo:'open', titulo:'J) <code>(a | bc)*</code>',
    gabarito:'Zero ou mais repetições do bloco “a” ou do bloco “bc”: L = {ε, a, bc, aa, abc, bca, bcbc, aabc, …}. Observe que “b” nunca aparece sozinho — sempre colado ao “c” e nessa ordem.',
    chaves:[{k:'zero ou mais repetições', syn:['zero ou mais','qualquer numero','qualquer número','repet','nenhuma ou']},{k:'bc é indivisível', syn:['bc','junto','sempre','par','bloco']}] }
  ]
},

/* ---------------- EXEMPLO 3 ---------------- */
{
  grupo:'Exemplo 3 — Escreva a REGEX',
  fonte:'Cap. 2 · §2.5',
  enunciado:'Utilizando as extensões das expressões regulares, escreva expressões que identifiquem o que se pede. <br><span class="muted">Sua resposta é testada contra casos que <b>devem</b> e casos que <b>não devem</b> casar — e é ancorada (a expressão precisa casar a string <b>inteira</b>).</span>',
  itens:[
  { id:'o-ex3a', tipo:'regex', titulo:'A) Números inteiros negativos', enunciado:'Ex.: -77',
    gabarito:'-[0-9]+', alt:['-\\d+','[-][0-9]+'], dica:'Um sinal de menos literal, seguido de <b>um ou mais</b> dígitos.',
    aceita:['-77','-1','-1234','-0'], rejeita:['77','-','+77','-7.5','a-7','-7a','--7'] },
  { id:'o-ex3b', tipo:'regex', titulo:'B) Palavras formadas apenas por vogais', enunciado:'Ex.: uai',
    gabarito:'[aeiou]+', alt:['[aeiouAEIOU]+'], dica:'Uma classe de caracteres com as cinco vogais e o fechamento positivo.',
    aceita:['uai','aeiou','oi','a','eu'], rejeita:['casa','xyz','ai1','a b','','bcd'] },
  { id:'o-ex3c', tipo:'regex', titulo:'C) A palavra “Inatel” em qualquer combinação de maiúsculas/minúsculas', enunciado:'Ex.: InaTeL',
    gabarito:'[Ii][Nn][Aa][Tt][Ee][Ll]', dica:'Uma classe de caracteres para cada letra, com as duas caixas.',
    aceita:['Inatel','INATEL','inatel','InaTeL','iNaTeL'], rejeita:['Inate','natel','Ina tel','Inatell','Inate1'] },
  { id:'o-ex3d', tipo:'regex', titulo:'D) Nome de usuário válido, de 3 a 15 caracteres', enunciado:'Ex.: JoTC100',
    gabarito:'[a-zA-Z0-9]{3,15}', alt:['[a-zA-Z0-9_]{3,15}','\\w{3,15}'], dica:'Classe com letras e dígitos + o operador <code>{m,n}</code>.',
    aceita:['JoTC100','abc','usuario123','a1b2c3d4e5f6g7h'], rejeita:['ab','a','abcdefghijklmnop','jo tc','jo@tc'] },
  { id:'o-ex3e', tipo:'regex', titulo:'E) CEP de uma cidade brasileira', enunciado:'Ex.: 37540-000',
    gabarito:'[0-9]{5}-[0-9]{3}', alt:['\\d{5}-\\d{3}'], dica:'Cinco dígitos, o hífen literal e três dígitos.',
    aceita:['37540-000','01310-100','99999-999'], rejeita:['3754-000','37540000','37540-0000','abcde-000','37540-00'] },
  { id:'o-ex3f', tipo:'regex', titulo:'F) Endereços de e-mail do Gmail ou do Yahoo', enunciado:'Ex.: jotc@gmail.com ou jotc@yahoo.com',
    gabarito:'[a-zA-Z0-9._%+-]+@(gmail|yahoo)[.]com', dica:'Parte local + <code>@</code> + alternância entre os dois domínios + <code>[.]</code> para o ponto literal + <code>com</code>.',
    aceita:['jotc@gmail.com','jotc@yahoo.com','jo.tc_1@gmail.com','a1@yahoo.com'], rejeita:['jotc@hotmail.com','jotc@gmail','@gmail.com','jotcgmail.com','jotc@gmail.com.br','jotc@yahoo.co'] },
  { id:'o-ex3g', tipo:'regex', titulo:'G) Horário no formato de 24 horas', enunciado:'Ex.: 19:30',
    gabarito:'([01][0-9]|2[0-3]):[0-5][0-9]', dica:'Trate a hora em dois casos: 00–19 e 20–23. Os minutos são 0–5 seguido de 0–9.',
    aceita:['19:30','00:00','23:59','09:05','12:00'], rejeita:['24:00','19:60','25:61','1930','ab:cd','19:3','2:30:00'] }
  ]
},

/* ---------------- EXEMPLO 4 ---------------- */
{
  grupo:'Exemplo 4 — Números sem sinal',
  fonte:'Cap. 2 · §2.5',
  enunciado:'Números sem sinal (inteiros ou ponto flutuante) são cadeias como <code>5777</code>, <code>0.099</code>, <code>3.14E4</code> ou <code>1.5E-4</code>. Como fica uma REGEX capaz de identificar todos esses perfis juntos?<br><span class="muted">Faça cada parte separadamente e depois junte tudo — esse é o <i>“Jump of the Cat!”</i> para resolver um REGEX mais complexo. 😼</span>',
  itens:[
  { id:'o-ex4a', tipo:'regex', titulo:'A) <code>digito</code>', enunciado:'Apenas um número qualquer.',
    gabarito:'[0-9]', alt:['\\d'], dica:'Uma classe de caracteres com o intervalo de 0 a 9.',
    aceita:['0','5','9'], rejeita:['','12','a','-1'] },
  { id:'o-ex4b', tipo:'regex', titulo:'B) <code>digitos</code>', enunciado:'Qualquer número inteiro positivo (uma ou mais ocorrências de dígito).',
    gabarito:'[0-9]+', alt:['\\d+'], dica:'É o <code>digito</code> do item A com fechamento positivo.',
    aceita:['0','5777','42','000'], rejeita:['','12a','-5','1.5'] },
  { id:'o-ex4c', tipo:'regex', titulo:'C) <code>numFrac</code>', enunciado:'Apenas a parte fracionária (o ponto e o que vem depois).',
    gabarito:'[.][0-9]+', alt:['\\.[0-9]+','\\.\\d+'], dica:'Cuidado: o ponto precisa ser <b>literal</b> — use <code>[.]</code> ou <code>\\.</code>, senão ele casa com qualquer caractere.',
    aceita:['.5','.099','.0'], rejeita:['5','.','.a','5.5','..5'] },
  { id:'o-ex4d', tipo:'regex', titulo:'D) <code>numExp</code>', enunciado:'Apenas a parte do expoente.',
    gabarito:'[eE][+-]?[0-9]+', alt:['E[+-]?[0-9]+','[eE](\\+|-)?[0-9]+'], dica:'A letra E, um sinal <b>opcional</b> e um ou mais dígitos.',
    aceita:['E4','E-4','E+4'], rejeita:['E','4','EE4','E4.5','E-'] },
  { id:'o-ex4e', tipo:'regex', titulo:'E) <code>num</code> — a junção de tudo', enunciado:'Junte as partes: digitos, a fracionária opcional e o expoente opcional.',
    gabarito:'[0-9]+([.][0-9]+)?([eE][+-]?[0-9]+)?', dica:'<code>digitos (numFrac)? (numExp)?</code> — as duas últimas partes são <b>opcionais</b> e nessa ordem.',
    aceita:['5777','0.099','3.14E4','1.5E-4','42','3.0','2E5','0'], rejeita:['.5','5.','5E','E5','abc','5.2.3','5E-','1,5'] }
  ]
}

], p2:[] };
