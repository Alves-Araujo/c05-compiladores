<p align="center">
  <img src="./assets/banner.svg" width="100%" alt="Jump of the Cat" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-0D1117?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-0D1117?style=for-the-badge&logo=html5&logoColor=E34F26" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-0D1117?style=for-the-badge&logo=css&logoColor=1572B6" alt="CSS3" />
</p>

<p align="center">
  <a href="https://alves-araujo.github.io/c05-compiladores/">
    <img src="https://img.shields.io/badge/%E2%86%92_Acessar_o_site-ff3ee0?style=for-the-badge&labelColor=0D1117" alt="Acessar o site" />
  </a>
</p>

Site estático de estudo para a disciplina **C05 — Linguagens de Programação e Compiladores**,
reunindo a matéria, exercícios com correção automática, um laboratório de expressões regulares
e uma folha de consulta impressa em um único lugar.

Sem back-end, sem login e sem build: HTML, CSS e JavaScript puro, servido direto pelo GitHub Pages.

## O que tem

| Aba | O que faz |
| --- | --- |
| **📚&nbsp;Matéria** | Conteúdo dos capítulos com índice lateral, diagramas e um passo a passo interativo das 6 fases do compilador. |
| **✍️&nbsp;Exercícios** | Duas coleções **separadas**: os exercícios **originais do material** (Exemplos 1 a 4) e exercícios **gerados por IA**, sempre identificados com o selo 🤖. Correção automática de tokenização, regex e questões objetivas; gabarito comentado nas discursivas. |
| **🔎&nbsp;Regex&nbsp;Lab** | Testador de expressões regulares no estilo do [rubular.com](https://rubular.com): destaque das ocorrências, tabela de grupos, flags e exemplos prontos do material. |
| **📋&nbsp;Formulário** | Folha de consulta com tudo que vale decorar. Tem busca e sai bonito no `Ctrl+P` (imprimir → salvar em PDF). |
| **🔍&nbsp;Busca** | Atalho **⌘K** (ou `Ctrl+K`). Busca instantânea em **tudo** — matéria, exercícios e formulário — direto no navegador, sem servidor. Também monta um prompt com sua pergunta + os trechos encontrados para levar a dúvida a uma IA já com o material junto. |
| **😼&nbsp;Tutor** | Painel fixo à direita na aba Matéria. Sem configurar nada, responde com os trechos do próprio material e links para a seção. Com uma chave de API sua, vira um chat de verdade com o Claude — que recebe a matéria inteira da prova como contexto. |

O seletor **P1 / P2** no topo troca a matéria da 1ª e da 2ª prova em todas as abas de uma vez.
O progresso dos exercícios fica salvo no `localStorage` do navegador — nada é enviado para lugar nenhum.

### Detalhes de interface

- O **gato da marca** é um anel de progresso no mesmo formato do ícone: ele se preenche conforme você resolve os exercícios da prova selecionada, e a porcentagem aparece escrita logo abaixo do nome. Clicar volta ao topo.
- **⌘K** (ou `Ctrl+K`, ou só `/`) abre a busca de qualquer lugar. `↑` `↓` navegam, `enter` abre, `esc` fecha.
- A **linha fina abaixo do cabeçalho** é a barra de leitura da página.
- Cartões e seções **entram animados** conforme você desce; tudo é desligado automaticamente se o sistema estiver com `prefers-reduced-motion`.
- O fundo tem uma silhueta estilizada de campus com antena parabólica — desenho original em SVG, sem nenhuma imagem externa.

## Rodar localmente

Basta abrir o `index.html` no navegador. Para servir por HTTP (recomendado, o Regex Lab usa Web Worker):

```bash
python3 -m http.server 8000
```

E acessar <http://localhost:8000>.

## Publicar sua própria cópia

O site é estático, então basta apontar o GitHub Pages para a raiz do repositório:
**Settings → Pages → Source: Deploy from a branch → Branch `main` / `(root)`**.

> O arquivo `.nojekyll` já vem incluso para o GitHub não processar nada com o Jekyll.

## Estrutura

```
.
├── index.html
├── assets/
│   ├── css/style.css
│   └── js/
│       ├── app.js         → rota, tema, seletor de prova, localStorage
│       ├── busca.js       → índice do material + paleta ⌘K + prompt para IA
│       ├── chat.js        → painel do tutor (modo material + Claude via fetch)
│       ├── materia.js     → renderiza os capítulos
│       ├── exercicios.js  → motor de correção
│       ├── regexlab.js    → testador de regex (Web Worker + timeout)
│       └── formulario.js  → folha de consulta
└── data/                  → todo o conteúdo (é aqui que você mexe)
```

## O tutor (aba Matéria)

O painel do tutor tem dois modos, e o segundo é opcional:

**📚 Modo material (padrão, zero configuração).** Responde com os trechos mais relevantes do próprio
material, com um botão para pular direto para a seção. Não é uma explicação — é o material achado
para você.

**🤖 Modo IA (opcional, com a sua chave).** O site é estático e **não tem servidor nem chave de API
embutida**. Para conversar com o Claude de verdade, cole uma chave da sua conta na engrenagem do
painel. A partir daí:

- a requisição sai **do seu navegador direto para `api.anthropic.com`** — não passa por servidor nenhum;
- a chave fica só no `localStorage` **deste navegador** (por isso: use apenas num computador seu);
- cada pergunta manda **a matéria inteira da prova selecionada** (~6 mil tokens) como contexto, então
  o modelo responde a partir do material e não do que ele "acha que sabe";
- esse bloco vai marcado com `cache_control`, então as perguntas seguintes da mesma sessão custam bem menos;
- a resposta chega em streaming, palavra por palavra.

O modelo padrão é `claude-opus-5`, com `claude-sonnet-5` e `claude-haiku-4-5` disponíveis no seletor.
A implementação usa `fetch` direto contra a Messages API (`assets/js/chat.js`) — o projeto não tem
bundler nem npm, então não dá para usar o SDK oficial.

## Sobre a "busca com IA"

O site é estático: **não existe servidor nem chave de API aqui**, então nenhuma resposta é gerada
dentro dele. O que a busca faz é:

1. Indexar todo o conteúdo da prova selecionada (matéria, exercícios e formulário) em memória;
2. Responder à sua consulta localmente, com ranking e trecho destacado;
3. Se você quiser uma explicação em vez de um trecho, montar um prompt com **sua pergunta + os
   trechos mais relevantes do material** e oferecer três saídas: copiar para colar onde quiser,
   abrir no Claude ou abrir no ChatGPT.

Ou seja: a IA responde com base no material da disciplina porque o material vai junto na pergunta.

## Créditos

Conteúdo baseado no material da disciplina **C05 — Linguagens de Programação e Compiladores**
(Prof. Msc. Daniel Mosca, a partir do material do Prof. Me. Renzo P. Mesquita — Inatel).
Material de estudo pessoal, sem fins comerciais.
