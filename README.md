# Demonstração do Autograder para Projetos Web

Este repositório demonstra como configurar e usar o Autograder da WebTech Network em um fluxo de correção automatizada com GitHub Actions.

Link da ferramenta: https://github.com/webtech-network/autograder

## Objetivo do Projeto

Este projeto separa claramente:

- O que o aluno entrega (pasta `submission/`)
- Como a correção é definida (`.github/autograder/criteria.json`)
- Como o feedback é exibido (`.github/autograder/feedback.json`)
- Como tudo é executado automaticamente (`.github/workflows/classroom.yml`)

Com isso, você consegue evoluir critérios de correção sem alterar o código do aluno e manter o processo reprodutível em push e pull request.

## Estrutura do Repositório

```text
.
├── .github/
│   ├── autograder/
│   │   ├── criteria.json
│   │   ├── feedback.json
│   │   └── setup.json
│   └── workflows/
│       └── classroom.yml
├── submission/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── relatorio.md
└── README.md
```

### Papel de Cada Parte

- `submission/`: representa os arquivos enviados pelo aluno.
- `.github/autograder/criteria.json`: define pesos, blocos e testes da avaliação.
- `.github/autograder/feedback.json`: define como o relatório final será apresentado.
- `.github/workflows/classroom.yml`: executa o autograder no GitHub Actions.
- `.github/autograder/setup.json`: arquivo de setup adicional (neste demo, não está sendo usado ativamente no fluxo).

## Como o Autograder é Executado Neste Repositório

O workflow em `.github/workflows/classroom.yml` dispara quando ocorre:

- `push` na branch `main`
- `pull_request` para `main`
- execução manual com `workflow_dispatch`

Trecho central do workflow:

```yaml
- name: Run Autograder
	uses: webtech-network/autograder@main
	with:
		template-preset: "webdev"
		feedback-type: "default"
		include-feedback: "true"
		openai-key: ${{ secrets.ENGINE }}
```

### O que cada parâmetro faz

- `template-preset: "webdev"`: usa a biblioteca de testes voltada para desenvolvimento web.
- `feedback-type: "default"`: seleciona o tipo de feedback padrão.
- `include-feedback: "true"`: publica feedback no resultado da execução.
- `openai-key`: chave do secret usada para recursos de feedback com IA.

Observação importante:

- Os caminhos usados em `criteria.json` devem apontar para arquivos em `submission/...`.
- Exemplo correto: `submission/index.html`.

## Como os Critérios de Correção Estão Organizados (`criteria.json`)

O arquivo `.github/autograder/criteria.json` define uma árvore de avaliação com pesos.

### Estrutura de pesos do exemplo

- `base` (100)
- `semana_1` (30)
- `semana_2` (30)
- `semana_3` (40)

Cada semana contém sub-blocos com pesos próprios e testes específicos.

### Semana 1 (HTML + CSS)

- HTML (60 dentro da semana)
- CSS (40 dentro da semana)

Exemplos de testes usados:

- `has_tag` (estrutura semântica: body, header, nav, main, article etc.)
- `has_attribute` (ex.: presença de atributo `class`)
- `check_css_linked` (verifica se CSS está vinculado ao HTML)
- `check_media_queries` e `check_flexbox_usage`
- `has_style` (contagem de propriedades como `font-size`, `margin`, `padding`)

### Semana 2 (Bootstrap + Documentação)

Exemplos de testes usados:

- `has_class` para verificar classes como `container`, `form-container`, `card`
- `check_project_structure` para validar estrutura esperada (ex.: `submission/README.md`)

### Semana 3 (JavaScript dinâmico)

Exemplos de testes usados:

- `js_uses_dom_manipulation` (métodos como `createElement`, `appendChild`, `innerHTML`, `querySelector`)
- `js_uses_query_string_parsing`
- `has_no_js_framework` (garante uso de JS sem framework)

## Como Configurar as Correções em `criteria.json`

Esta é a seção principal para manutenção da regra de avaliação.

### 1) Entenda a hierarquia

Cada nó pode ter:

- `subject_name`
- `weight`
- `subjects` (subníveis)
- `tests` (testes executáveis)

Se você alterar pesos, revise o impacto no resultado final.

### 2) Use o tipo de teste correto

Alguns testes têm parâmetros diferentes:

- `has_tag` costuma usar `required_count`
- `has_style` usa `count`
- `has_class` usa `class_names` como lista

Exemplo:

```json
{
  "file": "submission/index.html",
  "name": "has_class",
  "parameters": [
    { "name": "class_names", "value": ["container"] },
    { "name": "required_count", "value": 1 }
  ]
}
```

### 3) Sempre valide caminhos de arquivos

Referencie os arquivos como `submission/arquivo.ext`.

Correto:

```json
{ "file": "submission/styles.css", "name": "check_media_queries" }
```

Evite caminhos incompletos ou fora dessa convenção.

### 4) Exemplo de adição de novo teste

Para exigir uma nova tag no HTML:

```json
{
  "file": "submission/index.html",
  "name": "has_tag",
  "parameters": [
    { "name": "tag", "value": "section" },
    { "name": "required_count", "value": 1 }
  ]
}
```

## Como Configurar o Feedback em `feedback.json`

Arquivo: `.github/autograder/feedback.json`

Configuração atual:

```json
{
  "general": {
    "show_score": true,
    "show_passed_tests": false,
    "add_report_summary": true
  },
  "default": {}
}
```

### Significado dos campos

- `show_score: true`
  - Exibe a pontuação final para o aluno.

- `show_passed_tests: false`
  - Não lista testes que já passaram.
  - O feedback fica focado nas falhas.

- `add_report_summary: true`
  - Inclui um resumo geral da avaliação.

- `default: {}`
  - Espaço para configuração padrão adicional por tipo de feedback.

### Quando mudar essas opções

- Em fase de aprendizagem inicial, pode ser útil ativar `show_passed_tests: true`.
- Em fase de avaliação somativa, manter `false` reduz ruído e direciona melhoria.

## Fluxo Prático de Uso

1. O aluno altera arquivos em `submission/`.
2. O push ou pull request aciona o workflow.
3. O Autograder lê `criteria.json` e executa os testes.
4. O relatório final usa as regras de `feedback.json`.
5. A nota e o feedback ficam disponíveis na execução do GitHub Actions.

## Resumo

Este repositório exemplifica um cenário ideal para execução do Autograder para atividades web:

- Critérios técnicos e pesos em `.github/autograder/criteria.json`
- Política de feedback em `.github/autograder/feedback.json`
- Execução automática em `.github/workflows/classroom.yml`
- Entrega do aluno em `submission/`
