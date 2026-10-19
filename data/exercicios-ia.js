/* =============================================================
   EXERCÍCIOS GERADOS POR IA  (Provas 1 e 2)
   ⚠️ NÃO fazem parte do material oficial da disciplina.
   Foram escritos por IA a partir do conteúdo dos capítulos (Cap. 1 e 2 na P1; Cap. 2 e 3 na P2)
   para servir de treino extra. Confira sempre com os slides.

   Tipos: 'mc' | 'multi' | 'tf' | 'order' | 'tokenize' | 'regex' | 'accept' | 'open'
   ============================================================= */

const EX_IA = { p1:[

/* ---------------- Cap.1 múltipla escolha ---------------- */
{
  grupo:'Cap. 1 — Múltipla escolha',
  fonte:'gerado por IA a partir do Cap. 1',
  enunciado:'Marque a alternativa correta em cada questão.',
  itens:[
  { id:'a-mc1', tipo:'mc', titulo:'1) Gerações', enunciado:'A linguagem SQL pertence a qual geração de linguagens de programação?',
    opcoes:['2ª geração','3ª geração','4ª geração','5ª geração'], correta:2,
    just:'SQL é uma linguagem para aplicação específica e <b>não procedural</b> (<i>what to do</i>) — característica da 4ª geração, junto com Cypher e MQL.' },
  { id:'a-mc2', tipo:'mc', titulo:'2) Propriedades', enunciado:'Usar o símbolo <code>*</code> tanto para multiplicação quanto para ponteiros prejudica principalmente qual propriedade?',
    opcoes:['Portabilidade','Legibilidade','Eficiência','Reusabilidade'], correta:1,
    just:'É a <b>sobrecarga de operadores</b>, listada no material como fator que prejudica a <b>legibilidade</b>: o mesmo símbolo com significados diferentes.' },
  { id:'a-mc3', tipo:'mc', titulo:'3) Ortogonalidade', enunciado:'Sobre ortogonalidade, é correto afirmar que:',
    opcoes:['Quanto maior o número de exceções às regras, maior a ortogonalidade','Quanto menor o número de exceções às regras, maior a ortogonalidade','Ortogonalidade é sinônimo de portabilidade','Um número alto de construções primitivas aumenta a ortogonalidade'], correta:1,
    just:'“Quanto menor o número de exceções, maior a ortogonalidade.” O ideal é um número <b>pequeno</b> de construções primitivas combináveis de forma regular.' },
  { id:'a-mc4', tipo:'mc', titulo:'4) Trade-off', enunciado:'Segundo o material, linguagens que exigem verificação de tipos em <b>tempo de execução</b>:',
    opcoes:['São mais eficientes','São menos eficientes','Não afetam a eficiência','São menos confiáveis'], correta:1,
    just:'Verificação em tempo de execução custa processamento: aumenta a confiabilidade e <b>diminui a eficiência</b>.' },
  { id:'a-mc5', tipo:'mc', titulo:'5) Fases', enunciado:'Em qual fase é produzido o Código de Três Endereços?',
    opcoes:['Análise Semântica','Geração de Código Intermediário','Otimização de Código','Geração de Código Alvo'], correta:1,
    just:'O código de três endereços (uma operação, dois operandos de entrada, um de saída) é a representação intermediária mais utilizada.' },
  { id:'a-mc6', tipo:'mc', titulo:'6) Front-end', enunciado:'Qual destas fases <b>NÃO</b> pertence ao Front-End (Análise)?',
    opcoes:['Análise Léxica','Análise Semântica','Geração de Código Intermediário','Otimização'], correta:3,
    just:'O Front-End vai da Análise Léxica até a Geração de Código Intermediário. Otimização e Geração de Código Objeto formam o <b>Back-End (Síntese)</b>.' },
  { id:'a-mc7', tipo:'mc', titulo:'7) Ferramentas', enunciado:'O programa que recebe a linguagem assembly e produz um código de máquina relocável é o:',
    opcoes:['Pré-processador','Montador (Assembler)','Linker','Loader'], correta:1,
    just:'O <b>Assembler</b> gera o código de máquina relocável; o <b>Linker</b> combina objetos num executável e o <b>Loader</b> os põe na memória.' },
  { id:'a-mc8', tipo:'mc', titulo:'8) Erros', enunciado:'O comando <code>int x = "texto";</code> em uma linguagem com verificação estática é rejeitado em qual fase?',
    opcoes:['Análise Léxica','Análise Sintática','Análise Semântica','Otimização'], correta:2,
    just:'Os tokens são válidos (léxica ok) e a estrutura do comando é válida (sintática ok). O problema é de <b>tipos</b> — verificação típica da Análise Semântica.' },
  { id:'a-mc9', tipo:'mc', titulo:'9) Erros (2)', enunciado:'Já o trecho <code>while (x1 != 3 {</code> — faltando o parêntese de fechamento — é detectado na:',
    opcoes:['Análise Léxica','Análise Sintática','Análise Semântica','Geração de Código'], correta:1,
    just:'Todos os lexemas são válidos individualmente; o que está errado é a <b>interação</b> entre os tokens, verificada pela gramática na Análise Sintática.' },
  { id:'a-mc10', tipo:'mc', titulo:'10) Paradigmas', enunciado:'“O programador descreve o problema e a descrição é usada para encontrar a solução automaticamente.” Isso define o paradigma:',
    opcoes:['Imperativo','Estruturado','Declarativo','Concorrente'], correta:2,
    just:'É a definição de paradigma <b>declarativo</b> (<i>o que</i> fazer), que se subdivide em funcional e lógico.' },
  { id:'a-mc11', tipo:'mc', titulo:'11) Híbridos', enunciado:'Sobre a compilação híbrida do Java, é correto dizer que:',
    opcoes:['O javac gera código de máquina da máquina hospedeira','O javac gera bytecode, interpretado por uma máquina virtual','Java não usa compilador, apenas interpretador','O bytecode é específico de cada arquitetura'], correta:1,
    just:'O compilador gera <b>Java Bytecode</b>, que é interpretado pela JVM — por isso a implementação híbrida favorece a <b>portabilidade</b>.' },
  { id:'a-mc12', tipo:'mc', titulo:'12) Compilação cruzada', enunciado:'Compilar num PC com Linux um binário ARM que rodará numa Raspberry Pi é um exemplo de:',
    opcoes:['Compilação híbrida','Interpretação','Compilação cruzada','Ligação dinâmica'], correta:2,
    just:'Compilação cruzada é compilar para a plataforma Y a partir da plataforma X, com X ≠ Y.' },
  { id:'a-mc13', tipo:'mc', titulo:'13) Bibliotecas', enunciado:'Arquivos <code>.dll</code> são exemplos de bibliotecas:',
    opcoes:['Estáticas, independentes do SO','Estáticas, dependentes do SO','Dinâmicas, independentes do SO','Dinâmicas, dependentes do SO'], correta:3,
    just:'<i>Dynamic linking libraries</i> são inseridas em uma das fases do compilador e <b>dependem do sistema operacional</b>.' },
  { id:'a-mc14', tipo:'mc', titulo:'14) Tabela de símbolos', enunciado:'Por que a tabela de símbolos costuma ser implementada com tabela hash ou árvore binária de busca?',
    opcoes:['Para ocupar menos memória','Porque é acessada com muita frequência e precisa de acesso eficiente','Porque só ela permite armazenar tipos','Porque o padrão da linguagem C exige'], correta:1,
    just:'O material destaca a <b>frequência de acesso</b>: por isso a estrutura precisa ser rápida.' },
  { id:'a-mc15', tipo:'mc', titulo:'15) DSL', enunciado:'Qual das alternativas contém <b>apenas</b> linguagens de domínio específico (DSL)?',
    opcoes:['C, Java, Python','HTML, VHDL, SQL','Scala, Prolog, Lisp','Assembly, C++, Ada'], correta:1,
    just:'HTML (páginas), VHDL (hardware) e SQL (banco de dados) são os exemplos de DSL citados no material.' }
  ]
},

/* ---------------- Cap.1 múltipla resposta + V/F + ordenar ---------------- */
{
  grupo:'Cap. 1 — Verdadeiro ou falso, múltipla resposta e ordenação',
  fonte:'gerado por IA a partir do Cap. 1',
  enunciado:'Questões de fixação com vários formatos.',
  itens:[
  { id:'a-tf1', tipo:'tf', titulo:'Verdadeiro ou falso',
    itens:[
      {s:'O analisador léxico é capaz de detectar a atribuição de um texto a uma variável inteira.', v:false, just:'Erro de tipo é verificado na <b>Análise Semântica</b>.'},
      {s:'Bibliotecas dinâmicas são dependentes do sistema operacional.', v:true, just:'É exatamente a observação do material.'},
      {s:'O interpretador otimiza o código fonte antes de executá-lo.', v:false, just:'“A interpretação do código não otimiza o código fonte.”'},
      {s:'O Loader é o programa que combina vários arquivos objeto em um único executável.', v:false, just:'Quem combina é o <b>Linker</b>; o Loader reúne os executáveis na memória para execução.'},
      {s:'Um lexema que já foi alocado em uma classe de símbolos torna-se um token.', v:true, just:'É a definição do material.'},
      {s:'A string vazia ε pertence à linguagem descrita por a*.', v:true, just:'O fecho de Kleene inclui zero ocorrências.'},
      {s:'A concatenação tem precedência maior que o operador *.', v:false, just:'A ordem é <code>*</code> &gt; concatenação &gt; <code>|</code>.'},
      {s:'Linguagens de 4ª geração são procedurais.', v:false, just:'São <b>não procedurais</b> (<i>what to do</i>).'},
      {s:'O Back-End (Síntese) depende da máquina alvo.', v:true, just:'É o lado que gera e otimiza o código para a arquitetura; o Front-End depende da linguagem-fonte.'},
      {s:'O pré-processador é responsável por apagar comentários e executar substituições de macros.', v:true, just:'São funções citadas no material, junto com a inclusão de arquivos.'}
    ]},
  { id:'a-multi1', tipo:'multi', titulo:'Múltipla resposta — pilares da POO',
    enunciado:'Assinale <b>todos</b> os pilares da Programação Orientada a Objetos citados no material:',
    opcoes:['Classes','Iteração','Polimorfismo','Herança','Sequência','Abstração de dados','Encapsulamento'],
    correta:[0,2,3,5,6],
    just:'Sequência, seleção e iteração são os três mecanismos do paradigma <b>estruturado</b>, não pilares da POO.' },
  { id:'a-multi2', tipo:'multi', titulo:'Múltipla resposta — fatores que favorecem a confiabilidade',
    enunciado:'Quais fatores <b>favorecem</b> a confiabilidade de uma linguagem?',
    opcoes:['Verificação de tipos','Aritmética de ponteiros sem checagem','Tratamento de exceções','Não verificar intervalos de índices de arrays'],
    correta:[0,2],
    just:'As duas outras opções são “ações perigosas”, que <b>prejudicam</b> a confiabilidade.' },
  { id:'a-ord1', tipo:'order', titulo:'Ordene as fases do compilador',
    enunciado:'Coloque as fases na ordem em que são executadas, do programa-fonte ao programa-objeto.',
    itens:['Análise Léxica','Análise Sintática','Análise Semântica','Geração de Código Intermediário','Otimização de Código','Geração de Código Alvo'],
    just:'As quatro primeiras formam o Front-End (Análise); as duas últimas, o Back-End (Síntese).' },
  { id:'a-ord2', tipo:'order', titulo:'Ordene a criação do executável',
    enunciado:'Ordene os programas envolvidos na produção de um executável, do código-fonte à saída.',
    itens:['Pré-processador','Compilador','Montador (Assembler)','Linker / Loader'],
    just:'source → pré-processador → compilador → assembler (código relocável) → linker/loader → código de máquina alvo.' }
  ]
},

/* ---------------- Cap.2 tokenização extra ---------------- */
{
  grupo:'Cap. 2 — Tokenização (treino extra)',
  fonte:'gerado por IA a partir do Cap. 2',
  enunciado:'Classifique cada lexema usando <b>ID</b>, <b>KW</b>, <b>LT</b>, <b>SP</b> ou <b>OP</b> — mesmas convenções do Exemplo 1 do material.',
  itens:[
  { id:'a-tok1', tipo:'tokenize', titulo:'A) Código C',
    dica:'<code>int</code> é palavra reservada; <code>printf</code> é nome de função de biblioteca.',
    tokens:[
      {lex:'int',cls:'KW'},{lex:'soma',cls:'ID'},{lex:'=',cls:'OP'},{lex:'a',cls:'ID'},{lex:'+',cls:'OP'},{lex:'b',cls:'ID'},{lex:';',cls:'SP'},{br:1},
      {lex:'if',cls:'KW'},{lex:'(',cls:'SP'},{lex:'soma',cls:'ID'},{lex:'>=',cls:'OP'},{lex:'10',cls:'LT'},{lex:')',cls:'SP'},{lex:'{',cls:'SP'},{br:1},
      {lex:'printf',cls:'ID'},{lex:'(',cls:'SP'},{lex:'"ok"',cls:'LT'},{lex:')',cls:'SP'},{lex:';',cls:'SP'},{br:1},
      {lex:'}',cls:'SP'}
    ],
    notas:['<code>&gt;=</code> é um único token de operador relacional — regra do maior casamento possível.'] },
  { id:'a-tok2', tipo:'tokenize', titulo:'B) Código Java',
    dica:'Atenção ao <code>++</code>: é um operador único, não dois <code>+</code>.',
    tokens:[
      {lex:'for',cls:'KW'},{lex:'(',cls:'SP'},{lex:'int',cls:'KW'},{lex:'i',cls:'ID'},{lex:'=',cls:'OP'},{lex:'0',cls:'LT'},{lex:';',cls:'SP'},
      {lex:'i',cls:'ID'},{lex:'<',cls:'OP'},{lex:'n',cls:'ID'},{lex:';',cls:'SP'},{lex:'i',cls:'ID'},{lex:'++',cls:'OP'},{lex:')',cls:'SP'},{lex:'{',cls:'SP'},{br:1},
      {lex:'total',cls:'ID'},{lex:'=',cls:'OP'},{lex:'total',cls:'ID'},{lex:'*',cls:'OP'},{lex:'2',cls:'LT'},{lex:';',cls:'SP'},{br:1},
      {lex:'}',cls:'SP'}
    ],
    notas:['Os dois <code>;</code> dentro do <code>for</code> continuam sendo separadores.'] }
  ]
},

/* ---------------- Cap.2 aceita ou rejeita ---------------- */
{
  grupo:'Cap. 2 — A REGEX aceita esta string?',
  fonte:'gerado por IA a partir do Cap. 2',
  enunciado:'Para cada expressão regular, decida se a string pertence ou não à linguagem. Considere que a expressão precisa casar a string <b>inteira</b>.',
  itens:[
  { id:'a-ac1', tipo:'accept', titulo:'A) <code>a(b|c)*d</code>',
    strings:[{s:'ad',ok:true},{s:'abcd',ok:true},{s:'abbbd',ok:true},{s:'ab',ok:false},{s:'acd',ok:true},{s:'adb',ok:false},{s:'abcbcd',ok:true}],
    just:'Um “a” obrigatório, zero ou mais blocos “b” ou “c” em qualquer ordem, e um “d” obrigatório no fim.' },
  { id:'a-ac2', tipo:'accept', titulo:'B) <code>[a-z]+[0-9]{2}</code>',
    strings:[{s:'casa12',ok:true},{s:'a99',ok:true},{s:'casa1',ok:false},{s:'12casa',ok:false},{s:'Casa12',ok:false},{s:'ab123',ok:false}],
    just:'Uma ou mais letras <b>minúsculas</b> seguidas de exatamente dois dígitos. “ab123” tem três dígitos e “Casa12” tem maiúscula.' },
  { id:'a-ac3', tipo:'accept', titulo:'C) <code>(0|1)*11</code>',
    strings:[{s:'11',ok:true},{s:'0011',ok:true},{s:'101',ok:false},{s:'1',ok:false},{s:'111',ok:true},{s:'1101',ok:false}],
    just:'Qualquer sequência de 0s e 1s (inclusive vazia) que <b>termine</b> em “11”.' },
  { id:'a-ac4', tipo:'accept', titulo:'D) <code>a?bc.</code>  (Σ = {a,b,c})',
    strings:[{s:'bca',ok:true},{s:'abcc',ok:true},{s:'bc',ok:false},{s:'abc',ok:false},{s:'bcb',ok:true},{s:'aabcc',ok:false}],
    just:'O mesmo do Exemplo 2-I: “a” opcional, “bc” obrigatório e mais <b>um</b> caractere qualquer no fim.' }
  ]
},

/* ---------------- Cap.2 regex extras ---------------- */
{
  grupo:'Cap. 2 — Escreva a REGEX (treino extra)',
  fonte:'gerado por IA a partir do Cap. 2',
  enunciado:'Mesma mecânica do Exemplo 3: sua expressão é testada contra casos que devem e casos que não devem casar, sempre de forma ancorada.',
  itens:[
  { id:'a-rx1', tipo:'regex', titulo:'A) Identificador válido da linguagem C', enunciado:'Letra ou underline, seguido de letras, dígitos ou underlines. Ex.: <code>_total1</code>',
    gabarito:'[a-zA-Z_][a-zA-Z0-9_]*', dica:'É a expressão <code>letra (letra | dígito)*</code> do §2.4, com “letra” incluindo o underline.',
    aceita:['_total1','nome','x1','__init__','contador_1','A'], rejeita:['1x','no me','x-1','nome!','9'] },
  { id:'a-rx2', tipo:'regex', titulo:'B) Número binário', enunciado:'Uma ou mais ocorrências de 0 ou 1. Ex.: <code>1010</code>',
    gabarito:'[01]+', alt:['(0|1)+'], dica:'Classe de caracteres com dois elementos + fechamento positivo.',
    aceita:['0','1','1010','000111'], rejeita:['2','10a','1 0','','0.1'] },
  { id:'a-rx3', tipo:'regex', titulo:'C) Comentário de linha em C/Java', enunciado:'Duas barras seguidas de qualquer coisa até o fim da linha. Ex.: <code>// soma dois valores</code>',
    gabarito:'//.*', dica:'As duas barras literais e o <code>.</code> com fechamento estrela.',
    aceita:['// soma dois valores','//','//x','//////'], rejeita:['/* bloco */','# python','codigo();','/ um so'] },
  { id:'a-rx4', tipo:'regex', titulo:'D) CPF formatado', enunciado:'Ex.: <code>123.456.789-00</code>',
    gabarito:'[0-9]{3}[.][0-9]{3}[.][0-9]{3}-[0-9]{2}', dica:'Lembre de usar <code>[.]</code> para o ponto <b>literal</b>.',
    aceita:['123.456.789-00','000.111.222-33'], rejeita:['12345678900','123.456.789-0','123-456-789.00','123.456.78-90'] },
  { id:'a-rx5', tipo:'regex', titulo:'E) Placa de veículo no padrão Mercosul', enunciado:'Três letras maiúsculas, um dígito, uma letra maiúscula e dois dígitos. Ex.: <code>ABC1D23</code>',
    gabarito:'[A-Z]{3}[0-9][A-Z][0-9]{2}', dica:'Use <code>{n}</code> para as repetições exatas.',
    aceita:['ABC1D23','XYZ9Z99'], rejeita:['ABC1234','abc1d23','AB1C23','ABC1D234'] },
  { id:'a-rx6', tipo:'regex', titulo:'F) Data no formato dd/mm/aaaa', enunciado:'Não precisa validar o calendário, só o formato. Ex.: <code>05/09/2026</code>',
    gabarito:'[0-3][0-9]/[01][0-9]/[0-9]{4}', alt:['[0-9]{2}/[0-9]{2}/[0-9]{4}'], dica:'A barra é um caractere literal comum aqui.',
    aceita:['05/09/2026','31/12/1999','01/01/2000'], rejeita:['5/9/2026','2026-09-05','05-09-2026','05/09/26','ab/cd/efgh'] },
  { id:'a-rx7', tipo:'regex', titulo:'G) Número de celular com DDD', enunciado:'Ex.: <code>(35) 99999-1234</code>',
    gabarito:'[(][0-9]{2}[)] 9[0-9]{4}-[0-9]{4}', dica:'Parênteses são metacaracteres — para usá-los como literais, coloque-os numa classe: <code>[(]</code> e <code>[)]</code>.',
    aceita:['(35) 99999-1234','(11) 98888-0000'], rejeita:['35 99999-1234','(35)99999-1234','(355) 99999-1234','(35) 9999-1234'] }
  ]
},

/* ---------------- Discursivas ---------------- */
{
  grupo:'Discursivas — treine a resposta escrita',
  fonte:'gerado por IA a partir dos Caps. 1 e 2',
  enunciado:'Escreva sua resposta, compare com o gabarito e marque se acertou. Ideal para a parte dissertativa da prova.',
  itens:[
  { id:'a-op1', tipo:'open', titulo:'1) Lexema, token e padrão',
    enunciado:'Diferencie lexema, token e padrão, dando um exemplo de cada.',
    gabarito:'<b>Lexema</b> é a sequência de caracteres encontrada no programa fonte que obedece a algum padrão válido (ex.: <code>x1</code>). <b>Padrão</b> é a descrição da forma que os lexemas de um token podem assumir (ex.: “letra seguida de letras e dígitos”). <b>Token</b> é o par ⟨Nome_Token, Lexema⟩, isto é, o lexema já classificado numa classe de símbolos (ex.: ⟨ID, x1⟩), pronto para as próximas fases do compilador.',
    chaves:[{k:'lexema = sequência de caracteres', syn:['sequencia','sequência','cadeia','caracteres']},{k:'padrão = descrição/regra', syn:['descricao','descrição','regra','forma']},{k:'token = par / lexema classificado', syn:['par','classificad','classe','nome_token','⟨']}] },
  { id:'a-op2', tipo:'open', titulo:'2) Por que separar léxica de sintática?',
    enunciado:'Explique por que a análise léxica e a análise sintática são fases separadas em um compilador.',
    gabarito:'Porque fazem <b>trabalhos diferentes</b>: a léxica encontra padrões no texto (lexemas) e os transforma em tokens; a sintática verifica se a <b>interação</b> entre os tokens é válida na linguagem, usando uma gramática. Cada fase tem seu próprio conjunto de técnicas para resolver seu problema computacional, o que torna o compilador mais simples de projetar, testar e manter.',
    chaves:[{k:'trabalhos diferentes', syn:['trabalho','tarefa','funcao','função','diferente']},{k:'léxica: padrões → tokens', syn:['lexema','padr','token']},{k:'sintática: gramática/interação', syn:['gramatica','gramática','interacao','interação','arvore','árvore','estrutura']}] },
  { id:'a-op3', tipo:'open', titulo:'3) Confiabilidade × eficiência',
    enunciado:'Explique o trade-off entre confiabilidade e eficiência citado no material.',
    gabarito:'Recursos que aumentam a confiabilidade — verificação de tipos (sobretudo em tempo de execução) e tratamento de exceções — exigem trabalho extra durante a execução do programa. Em geral, os fatores que melhoram confiabilidade, abstração e legibilidade <b>diminuem</b> a eficiência, que está ligada ao tempo de execução. Em aplicações de tempo real, por exemplo, pode-se abrir mão de checagens para ganhar velocidade.',
    chaves:[{k:'verificação de tipos / exceções custam tempo', syn:['verificacao','verificação','tipos','excec','exceç']},{k:'eficiência = tempo de execução', syn:['tempo de execucao','tempo de execução','desempenho','velocidade','rapid']},{k:'um sobe, outro desce', syn:['diminui','reduz','custo','troca','trade','prejudic']}] },
  { id:'a-op4', tipo:'open', titulo:'4) Ortogonalidade',
    enunciado:'O que é ortogonalidade em uma linguagem de programação? Cite um fator que a favorece e um que a prejudica.',
    gabarito:'É a capacidade de a linguagem permitir ao programador combinar seus conceitos básicos sem que a combinação produza efeitos anômalos — o programador consegue prever com segurança o comportamento de qualquer combinação. <b>Favorece:</b> um número pequeno de construções primitivas combináveis de forma regular. <b>Prejudica:</b> muitas exceções às regras da linguagem e operadores que não se aplicam a qualquer tipo de operando.',
    chaves:[{k:'combinar conceitos sem efeitos anômalos', syn:['combin','anomal','anômal','previs','prever']},{k:'poucas construções primitivas', syn:['primitiv','pequeno','poucas','regular']},{k:'exceções prejudicam', syn:['excec','exceç']}] },
  { id:'a-op5', tipo:'open', titulo:'5) Linker × Loader',
    enunciado:'Qual a diferença entre Linker e Loader?',
    gabarito:'O <b>Linker</b> combina um ou mais arquivos objeto gerados pelo compilador (e as bibliotecas) em um único arquivo executável — necessário porque programas grandes normalmente são compilados em partes. O <b>Loader</b> reúne os arquivos executáveis na memória para execução.',
    chaves:[{k:'linker combina objetos em executável', syn:['combina','junta','une','liga','executavel','executável']},{k:'loader carrega na memória', syn:['memoria','memória','carrega','reune','reúne','execucao','execução']}] },
  { id:'a-op6', tipo:'open', titulo:'6) Java e portabilidade',
    enunciado:'Por que a implementação híbrida do Java favorece a portabilidade?',
    gabarito:'Porque o compilador Java não gera código da máquina hospedeira: gera <b>bytecode</b>, uma linguagem de baixo nível independente de arquitetura, que é interpretado por uma <b>máquina virtual</b>. O mesmo bytecode roda em qualquer plataforma que possua a JVM, de modo que o programa se comporta da mesma maneira independentemente de sistema operacional ou hardware — que é justamente a definição de portabilidade.',
    chaves:[{k:'bytecode', syn:['bytecode','byte code','codigo intermediario','código intermediário']},{k:'máquina virtual', syn:['maquina virtual','máquina virtual','jvm','vm']},{k:'independente de plataforma', syn:['independente','qualquer plataforma','qualquer sistema','mesmo comportamento','hardware']}] },
  { id:'a-op7', tipo:'open', titulo:'7) Tabela de símbolos e tratador de erros',
    enunciado:'Por que a Tabela de Símbolos e o Tratador de Erros aparecem ligados a todas as fases do compilador?',
    gabarito:'Porque são <b>submódulos comuns</b> a todas as fases. A tabela de símbolos guarda as informações dos identificadores (tipo, tamanho, escopo) que são <b>escritas</b> pela análise léxica/semântica e <b>consultadas</b> pelas fases seguintes — por isso a seta é bidirecional. O tratador de erros precisa estar disponível em qualquer fase, já que um erro pode ocorrer em qualquer uma delas, e decide entre <b>abortar</b> a compilação ou <b>recuperar</b> e continuar.',
    chaves:[{k:'submódulos comuns a todas as fases', syn:['todas as fases','comum','comuns','qualquer fase']},{k:'tabela guarda/consulta identificadores', syn:['identificador','tipo','escopo','consulta','armazena','guarda']},{k:'abortar ou recuperar', syn:['abortar','recuperar','parar','continuar']}] }
  ]
}

], p2:[

/* ---------------- Cap.2 Parte 2 múltipla escolha ---------------- */
{
  grupo:'Cap. 2 (Parte 2) — Múltipla escolha',
  fonte:'gerado por IA a partir do Cap. 2 (Parte 2)',
  enunciado:'Marque a alternativa correta em cada questão.',
  itens:[
  { id:'b-mc1', tipo:'mc', titulo:'1) Quíntupla', enunciado:'Em A = (Q, Σ, δ, q0, F), qual componente indica o estado inicial?',
    opcoes:['Q','Σ','q0','F'], correta:2,
    just:'<b>q0</b> é o estado inicial. F é o conjunto de estados de aceitação.' },
  { id:'b-mc2', tipo:'mc', titulo:'2) Determinismo', enunciado:'Em um AFD, para um mesmo estado e um mesmo símbolo lido, quantos estados seguintes são possíveis?',
    opcoes:['Nenhum','Exatamente um','Um ou mais','Qualquer número'], correta:1,
    just:'É a restrição do determinismo: δ devolve um único estado. Quando não há seta para o símbolo lido, a cadeia é rejeitada.' },
  { id:'b-mc3', tipo:'mc', titulo:'3) Estado de aceitação', enunciado:'Como um estado de aceitação é marcado no diagrama de transição?',
    opcoes:['Com uma seta de entrada','Com um círculo duplo','Com um asterisco ao lado do nome','Com um losango'], correta:1,
    just:'Círculo duplo. O asterisco é usado na <b>tabela</b> de transição.' },
  { id:'b-mc4', tipo:'mc', titulo:'4) Tabela de transição', enunciado:'Na tabela de transição, qual símbolo marca o estado inicial e qual marca os estados de aceitação?',
    opcoes:['-> e *','* e ->','| e =','> e <'], correta:0,
    just:'A seta (<code>-&gt;</code>) marca o estado inicial; o asterisco (<code>*</code>) marca os estados de aceitação.' },
  { id:'b-mc5', tipo:'mc', titulo:'5) Fita de entrada', enunciado:'Qual é a função da fita de entrada em um autômato finito?',
    opcoes:['Guardar a função de transição','Conter a palavra a ser processada, símbolo por símbolo','Marcar os estados de aceitação','Armazenar o estado atual'], correta:1,
    just:'A fita contém a informação a ser processada. O estado atual fica na unidade de controle.' },
  { id:'b-mc6', tipo:'mc', titulo:'6) AFN', enunciado:'Qual afirmação sobre os AFNs é verdadeira?',
    opcoes:['Não podem ter mais de uma transição com o mesmo símbolo a partir de um estado','Podem ter ε-transições, e a função de transição devolve um conjunto de estados','Todo AFN é também um AFD','Não reconhecem linguagens regulares'], correta:1,
    just:'O AFN devolve um conjunto de estados e pode usar ε-transições. Não é verdade que todo AFN seja AFD.' },
  { id:'b-mc7', tipo:'mc', titulo:'7) Construção de Thompson', enunciado:'Na Construção de Thompson, qual operação liga por uma ε-transição o estado de aceitação de r de volta ao estado inicial de r?',
    opcoes:['Concatenação','União (r|s)','Repetição positiva (+)','Símbolo básico'], correta:2,
    just:'É a repetição (+). O fecho de Kleene (*) usa essa mesma ideia e ainda acrescenta uma ε-transição do novo início ao novo fim, para aceitar a cadeia vazia.' },
  { id:'b-mc8', tipo:'mc', titulo:'8) Subconjuntos', enunciado:'Na conversão AFN → AFD pelo produto cartesiano, quantos conjuntos de estados existem, no máximo, para um AFN com k estados?',
    opcoes:['k','k²','2^k','k!'], correta:2,
    just:'São 2<sup>k</sup> combinações, incluindo o conjunto vazio. Por isso o AFD pode ter até 2<sup>k</sup> estados.' },
  { id:'b-mc9', tipo:'mc', titulo:'9) ε-fecho', enunciado:'O ε-fecho de um estado s sempre contém:',
    opcoes:['Apenas o símbolo a ser lido','Somente os estados de aceitação','O próprio s e todos os estados alcançáveis a partir de s por ε-transições','Todos os estados do autômato'], correta:2,
    just:'O ε-fecho é o conjunto de estados alcançáveis por zero ou mais ε-transições, e ele sempre contém o próprio estado.' }
  ]
},

/* ---------------- Cap.2 Parte 2 verdadeiro ou falso ---------------- */
{
  grupo:'Cap. 2 (Parte 2) — Verdadeiro ou falso',
  fonte:'gerado por IA a partir do Cap. 2 (Parte 2)',
  enunciado:'Questões de fixação sobre AFDs e AFNs.',
  itens:[
  { id:'b-tf1', tipo:'tf', titulo:'Verdadeiro ou falso',
    itens:[
      {s:'A quíntupla de um AFD é formada por Q, Σ, δ, q0 e F.', v:true, just:'São exatamente os cinco componentes da definição.'},
      {s:'Um AFD pode ter duas transições diferentes saindo do mesmo estado com o mesmo símbolo.', v:false, just:'Isso é o não determinismo, próprio dos AFNs.'},
      {s:'Um AFD pode usar ε-transições.', v:false, just:'AFDs não podem usar transições com vazio. Isso é permitido nos AFNs.'},
      {s:'Todo AFD é também um AFN.', v:true, just:'O AFD é um caso particular de AFN: cada conjunto de estados tem um único elemento.'},
      {s:'Nem todo AFN é um AFD.', v:true, just:'Um AFN pode ter várias saídas para o mesmo símbolo, o que um AFD não permite.'},
      {s:'Na tabela de transição, o asterisco (*) marca o estado inicial.', v:false, just:'A seta (-&gt;) marca o inicial. O asterisco marca os estados de aceitação.'},
      {s:'Em um AFD, se não há seta para o símbolo lido a partir do estado atual, a cadeia é rejeitada.', v:true, just:'Essa é a convenção dos diagramas: a ausência de seta equivale a rejeição.'},
      {s:'O conjunto F de um AFD pode ser vazio.', v:true, just:'Nesse caso o autômato rejeita todas as cadeias, o que é permitido pela definição.'}
    ]},
  ]
},

/* ---------------- Cap.2 Parte 2 ordenação ---------------- */
{
  grupo:'Cap. 2 (Parte 2) — Ordene o método',
  fonte:'gerado por IA a partir do Cap. 2 (Parte 3)',
  enunciado:'Os métodos de conversão têm passos numerados. Coloque-os na ordem correta.',
  itens:[
  { id:'b-ord1', tipo:'order', titulo:'Conversão AFN → AFD (sem ε-transições)',
    enunciado:'Ordene os 8 passos da conversão de um AFN sem ε-transições para um AFD.',
    itens:[
      'Construir a tabela de transições do AFN',
      'Construir a tabela do AFD pelo produto cartesiano dos estados do AFN (incluindo o conjunto vazio)',
      'Marcar como candidatos a aceitação os conjuntos que contêm um estado de aceitação do AFN',
      'Preencher as transições de cada conjunto por símbolo (união quando houver mais de um estado)',
      'Eliminar os estados inacessíveis',
      'Montar o AFD a partir da tabela de transições',
      'Eliminar os estados sem saída para outro estado e que não são finais',
      'Testar se as entradas válidas do AFN também são válidas no AFD'
    ],
    just:'Segue o método de 8 passos do material (§2.12.1).' },
  { id:'b-ord2', tipo:'order', titulo:'Conversão AFN-ε → AFD',
    enunciado:'Ordene os 6 passos da conversão de um AFN com ε-transições para um AFD.',
    itens:[
      'Calcular o ε-fecho do estado inicial do AFN-ε, que será o estado inicial do AFD',
      'Montar uma tabela com os fechamentos encontrados e dar um nome a cada um',
      'Para cada conjunto e símbolo, calcular S_a e o ε-fecho de S_a',
      'Repetir até não surgirem novos estados nem transições',
      'Marcar como aceitação os conjuntos que contêm um estado de aceitação do AFN-ε',
      'Desenhar o AFD resultante'
    ],
    just:'Método de 6 passos do material (§2.12.2).' }
  ]
},

/* ---------------- Cap.2 Parte 2 aceita ou rejeita ---------------- */
{
  grupo:'Cap. 2 (Parte 2) — A cadeia é aceita?',
  fonte:'gerado por IA a partir do Cap. 2 (Parte 2)',
  enunciado:'Para cada expressão, decida se a cadeia pertence à linguagem. Considere que a expressão precisa casar a cadeia <b>inteira</b>.',
  itens:[
  { id:'b-ac1', tipo:'accept', titulo:'A) <code>[0-9]+(\\.[0-9]+)?</code> (inteiro ou decimal)',
    strings:[{s:'77',ok:true},{s:'3.14',ok:true},{s:'360.5',ok:true},{s:'3.',ok:false},{s:'.5',ok:false},{s:'1.2.3',ok:false}],
    just:'Um ou mais dígitos, com uma parte decimal opcional. Quando existe ponto, precisa haver dígitos antes e depois dele.' },
  { id:'b-ac2', tipo:'accept', titulo:'B) <code>letra(letra|digito)*</code> (letra = a–z ou A–Z; digito = 0–9)',
    strings:[{s:'SUMMEROF69',ok:true},{s:'x',ok:true},{s:'A1b2',ok:true},{s:'9x',ok:false},{s:'a_b',ok:false},{s:'',ok:false}],
    just:'Começa obrigatoriamente com letra; depois, zero ou mais letras ou dígitos. Por isso “9x” e a cadeia vazia são rejeitadas.' },
  { id:'b-ac3', tipo:'accept', titulo:'C) <code>(ab)*c</code>',
    strings:[{s:'c',ok:true},{s:'ababc',ok:true},{s:'abac',ok:false},{s:'abcb',ok:false},{s:'abc',ok:false}],
    just:'Zero ou mais repetições do bloco “ab” seguidas de um “c” obrigatório no fim.' }
  ]
},

/* ---------------- Cap.2 Parte 3 escreva a REGEX ---------------- */
{
  grupo:'Cap. 2 (Parte 3) — Escreva a REGEX',
  fonte:'gerado por IA a partir do Cap. 2 (Parte 3)',
  enunciado:'Sua expressão é testada contra casos que devem casar e casos que não devem casar, sempre de forma ancorada.',
  itens:[
  { id:'b-rx1', tipo:'regex', titulo:'A) Cadeias de 0 e 1 que terminam em 00', enunciado:'Sobre Σ = {0,1}. Ex.: <code>100</code> e <code>000</code>.',
    gabarito:'(0|1)*00', alt:['[01]*00'], dica:'Qualquer sequência de 0s e 1s, seguida de “00” no fim.',
    aceita:['00','100','0100','000'], rejeita:['0','01','10',''] },
  { id:'b-rx2', tipo:'regex', titulo:'B) Cadeias de 0 e 1 que contêm a substring 01', enunciado:'Sobre Σ = {0,1}. Ex.: <code>1010</code>.',
    gabarito:'[01]*01[01]*', alt:['(0|1)*01(0|1)*'], dica:'Algo qualquer, depois o bloco “01”, depois algo qualquer.',
    aceita:['01','1010','0011','001'], rejeita:['0','1','10','1100'] },
  { id:'b-rx3', tipo:'regex', titulo:'C) Cadeias de 0 e 1 que começam com 1 e terminam com 0', enunciado:'Sobre Σ = {0,1}. Ex.: <code>1010</code>.',
    gabarito:'1[01]*0', alt:['1(0|1)*0'], dica:'Um “1” obrigatório no início e um “0” obrigatório no fim, com qualquer coisa no meio.',
    aceita:['10','1010','1000'], rejeita:['1','0','01','0110'] },
  { id:'b-rx4', tipo:'regex', titulo:'D) Número real com sinal opcional', enunciado:'Ex.: <code>-3.5</code>, <code>+2</code>, <code>10</code>.',
    gabarito:'[+-]?[0-9]+([.][0-9]+)?', dica:'Sinal opcional, dígitos, e uma parte decimal opcional. Use <code>[.]</code> para o ponto literal.',
    aceita:['-3.5','+2','10','0.0'], rejeita:['3.','.5','--1','1,5','+'] }
  ]
},

/* ---------------- Cap.3 verdadeiro ou falso ---------------- */
{
  grupo:'Cap. 3 — Verdadeiro ou falso',
  fonte:'gerado por IA a partir do Cap. 3',
  enunciado:'Questões de fixação sobre gramáticas, derivações e árvores.',
  itens:[
  { id:'b-tf2', tipo:'tf', titulo:'Verdadeiro ou falso',
    itens:[
      {s:'Na gramática E -> E O E | -E | (E) | id, a cadeia -(id + id) pode ser derivada.', v:true, just:'Veja a derivação do Exemplo 4.'},
      {s:'Uma derivação mais à esquerda e uma mais à direita da mesma cadeia sempre geram árvores diferentes.', v:false, just:'Podem gerar a mesma árvore. A árvore filtra a ordem das substituições (ver Exemplo 8).'},
      {s:'Em uma GLC, os não terminais são os tokens recebidos do analisador léxico.', v:false, just:'Os tokens são os <b>terminais</b>. Os não terminais são variáveis sintáticas.'},
      {s:'O símbolo inicial S é um não terminal.', v:true, just:'Ele representa a linguagem gerada pela gramática.'},
      {s:'Na árvore de derivação, os filhos de um nó são rotulados da direita para a esquerda.', v:false, just:'A ordem é da <b>esquerda para a direita</b>, pelos símbolos do corpo da produção.'},
      {s:'Uma expressão regular basta para descrever a estrutura aninhada de expressões com parênteses.', v:false, just:'Estruturas aninhadas e recursivas pedem gramáticas livres de contexto.'}
    ]}
  ]
},

/* ---------------- Cap.3 múltipla escolha ---------------- */
{
  grupo:'Cap. 3 — Múltipla escolha',
  fonte:'gerado por IA a partir do Cap. 3',
  enunciado:'Marque a alternativa correta em cada questão.',
  itens:[
  { id:'b-mc10', tipo:'mc', titulo:'10) Zeros consecutivos', enunciado:'Na gramática S -> 1S | 0A | ε; A -> 1S | 0B | ε; B -> 1S | ε, qual é o maior número de zeros consecutivos que podem ser gerados?',
    opcoes:['1','2','3','Qualquer número'], correta:1,
    just:'De S vai-se a 0A, de A a 0B, e B só gera 1S ou ε. Por isso o máximo são dois zeros seguidos.' },
  { id:'b-mc11', tipo:'mc', titulo:'11) Cabeça da produção', enunciado:'Em uma produção de GLC, o que fica do lado esquerdo do símbolo de produção?',
    opcoes:['Um terminal','O corpo da produção','O não terminal de cabeça','Sempre o símbolo inicial'], correta:2,
    just:'A cabeça (lado esquerdo) é sempre um <b>não terminal</b>.' },
  { id:'b-mc12', tipo:'mc', titulo:'12) Raiz da árvore', enunciado:'Na árvore de derivação de <code>num + num</code>, com as regras <code>exp -> exp op exp | ( exp ) | num</code>, qual é a raiz?',
    opcoes:['num','op','exp','+'], correta:2,
    just:'A raiz representa o primeiro passo, que aplica <code>exp -&gt; exp op exp</code>, e é rotulada com o não terminal <code>exp</code>.' },
  { id:'b-mc13', tipo:'mc', titulo:'13) Folhas', enunciado:'Quantas folhas tem a árvore de derivação de <code>(num - num) * num</code>, contando os parênteses?',
    opcoes:['5','6','7','8'], correta:2,
    just:'As folhas são os terminais da cadeia: <code>( num - num ) * num</code>, ou seja, 7 tokens.' },
  { id:'b-mc14', tipo:'mc', titulo:'14) Pré-ordem', enunciado:'Qual é a ordem da enumeração em pré-ordem dos nós de uma árvore de derivação?',
    opcoes:['Esquerda, raiz, direita','Raiz, esquerda, direita','Filhos antes do pai','Por nível'], correta:1,
    just:'Pré-ordem = raiz, esquerda, direita. É a ordem em que o material enumera os passos de derivação.' }
  ]
},

/* ---------------- Cap.3 ordenação ---------------- */
{
  grupo:'Cap. 3 — Ordene a derivação',
  fonte:'gerado por IA a partir do Cap. 3',
  enunciado:'Coloque os passos na ordem da derivação.',
  itens:[
  { id:'b-ord3', tipo:'order', titulo:'Derivação mais à esquerda de -(id + id)',
    enunciado:'Gramática: E -> E O E | -E | (E) | id; O -> + | - | *. Ordene os passos da derivação mais à esquerda.',
    itens:['E ⇒ -E','⇒ -(E)','⇒ -(E O E)','⇒ -(id O E)','⇒ -(id + E)','⇒ -(id + id)'],
    just:'Em cada passo substitui-se o não terminal mais à esquerda.' }
  ]
},

/* ---------------- Cap.3 discursivas ---------------- */
{
  grupo:'Discursivas — Parte 2 e Cap. 3',
  fonte:'gerado por IA a partir dos Caps. 2 (Partes 2 e 3) e 3',
  enunciado:'Escreva sua resposta, compare com o gabarito e marque se acertou. Ideal para a parte dissertativa da prova.',
  itens:[
  { id:'b-op1', tipo:'open', titulo:'1) AFN × AFD',
    enunciado:'Por que o AFN é mais fácil de construir do que o AFD, e qual é a consequência no tempo de reconhecimento?',
    gabarito:'O AFN permite várias transições para o mesmo símbolo e ε-transições, o que facilita modelar padrões como uniões e repetições diretamente. Em compensação, para reconhecer uma cadeia ele pode precisar explorar vários caminhos, então em geral gasta mais tempo. O AFD é mais difícil de construir, mas sua saída é previsível e ele reconhece as cadeias em tempo menor.',
    chaves:[
      {k:'varias transicoes / epsilon facilitam a construcao', syn:['varias transicoes','várias transições','epsilon','ε','vazio','facilit']},
      {k:'AFN explora mais caminhos: mais tempo', syn:['tempo','caminhos','mais lento','demora']},
      {k:'AFD: saída previsível', syn:['previs','unica','única','determin']}
    ] },
  { id:'b-op2', tipo:'open', titulo:'2) ε-fecho',
    enunciado:'O que é o ε-fecho de um estado e por que ele é usado na conversão de AFN-ε em AFD?',
    gabarito:'O ε-fecho de um estado é o conjunto de estados alcançáveis a partir dele por zero ou mais ε-transições (e sempre contém o próprio estado). Ele é usado para tratar as transições “invisíveis” na conversão, de modo que cada novo estado do AFD passa a ser um <b>conjunto</b> de estados do AFN-ε.',
    chaves:[
      {k:'estados alcancaveis / atingiveis', syn:['alcancavel','alcançável','alcanc','atingivel','atingível','atinge']},
      {k:'zero ou mais epsilon-transicoes', syn:['zero','epsilon','ε','vazio']},
      {k:'conjunto de estados no AFD', syn:['conjunto']}
    ] },
  { id:'b-op3', tipo:'open', titulo:'3) Thompson para r|s',
    enunciado:'Descreva a Construção de Thompson para a união r|s.',
    gabarito:'Adiciona-se um novo estado inicial, com ε-transições para o estado inicial de r e para o estado inicial de s. O estado de aceitação de r e o de s ganham ε-transições para um novo estado de aceitação. Assim, a máquina aceita tudo o que r ou s aceitam.',
    chaves:[
      {k:'novo estado inicial com epsilon', syn:['novo estado inicial','novo inicial','inicial']},
      {k:'novo estado de aceitacao com epsilon', syn:['novo estado de aceitacao','novo estado de aceitação','novo estado final','novo final']},
      {k:'ligados por epsilon-transicoes', syn:['epsilon','ε','vazio']}
    ] },
  { id:'b-op4', tipo:'open', titulo:'4) Regex × gramática',
    enunciado:'Por que a análise sintática não pode ser feita somente com expressões regulares?',
    gabarito:'Expressões regulares descrevem padrões de tokens sem estrutura aninhada. A sintaxe das linguagens de programação tem estruturas recursivas (parênteses aninhados, expressões dentro de expressões), que exigem uma gramática livre de contexto (GLC) para serem descritas.',
    chaves:[
      {k:'estrutura recursiva / aninhada', syn:['recurs','aninh']},
      {k:'gramatica livre de contexto', syn:['gramatica','gramática','glc','livre de contexto']}
    ] },
  { id:'b-op5', tipo:'open', titulo:'5) Derivação à esquerda × à direita',
    enunciado:'Diferencie a derivação mais à esquerda da mais à direita e diga o que elas têm em comum na árvore.',
    gabarito:'A derivação mais à esquerda substitui sempre o não terminal mais à esquerda em cada forma; a mais à direita substitui sempre o mais à direita. As duas podem gerar a <b>mesma árvore de derivação</b>, porque a árvore filtra a ordem das substituições.',
    chaves:[
      {k:'esquerda: nao terminal mais a esquerda', syn:['esquerda']},
      {k:'direita: nao terminal mais a direita', syn:['direita']},
      {k:'mesma arvore', syn:['arvore','árvore','mesma']}
    ] },
  { id:'b-op6', tipo:'open', titulo:'6) Árvore de derivação',
    enunciado:'O que é uma árvore de derivação? Cite as regras para montá-la.',
    gabarito:'É uma representação gráfica de uma derivação que filtra a ordem das substituições. Cada nó interno representa a aplicação de uma produção e é rotulado com o não terminal da cabeça; os filhos são os símbolos do corpo, da esquerda para a direita; as folhas são os terminais.',
    chaves:[
      {k:'representacao grafica', syn:['grafic','gráfic']},
      {k:'no interno = producao', syn:['produc','produç']},
      {k:'filhos da esquerda para a direita', syn:['esquerda para a direita','esquerda p','esquerda']},
      {k:'folhas = terminais', syn:['folha','terminal']}
    ] }
  ]
}

], };
