# Calculadora de ROI de Ecossistema de IA - Requirements

## Objetivo

Construir uma Calculadora de ROI de Ecossistema de IA para uso em reunioes comerciais com diretores financeiros, permitindo transformar hipoteses de ganho operacional em uma narrativa financeira clara: horas economizadas, erros evitados, receita incremental, custo total, ROI e payback.

## Usuario-alvo

- Consultor, vendedor consultivo ou lider de transformacao digital que apresenta uma proposta de Ecossistema de IA.
- CFO, diretor financeiro ou decisor executivo que precisa validar impacto economico antes de aprovar investimento.

## Problema

Clientes frequentemente percebem IA como algo interessante, mas abstrato. A ferramenta deve traduzir o valor de uma iniciativa de IA para metricas financeiras compreensiveis por um CFO, evitando foco tecnico em produtividade de prompts ou automacao isolada.

## Escopo funcional

### Entradas obrigatorias

- Numero de funcionarios impactados.
- Horas economizadas por funcionario por dia.
- Custo hora medio por funcionario.
- Custo de implementacao.
- Custo operacional anual.

### Entradas opcionais com valores padrao

- Dias uteis por ano: `250`.
- Taxa de erro atual: `0.15`.
- Custo medio por erro: `50.0`.
- Tarefas por dia por funcionario: `40`.
- Receita incremental mensal: `0`.
- Margem de contribuicao: `0.30`.

### Calculos obrigatorios

1. Horas economizadas no ano:

```text
horas_totais = num_funcionarios * horas_economizadas_dia * dias_uteis_ano
```

2. Valor das horas economizadas:

```text
valor_horas = horas_totais * custo_hora_funcionario
```

3. Erros atuais por ano:

```text
erros_atuais_ano = num_funcionarios * tarefas_dia_por_funcionario * dias_uteis_ano * taxa_erro_atual
```

4. Erros evitados, assumindo reducao de 50% da taxa de erro:

```text
erros_evitados = erros_atuais_ano * 0.50
```

5. Valor dos erros evitados:

```text
valor_erros = erros_evitados * custo_medio_erro
```

6. Valor financeiro da receita incremental:

```text
valor_receita = receita_incremental_mensal * 12 * margem_contribuicao
```

7. Beneficio total anual:

```text
beneficio_total = valor_horas + valor_erros + valor_receita
```

8. Custo total do primeiro ano:

```text
custo_total = custo_implementacao + custo_operacao_anual
```

9. ROI liquido:

```text
roi_liquido = beneficio_total - custo_total
```

10. ROI percentual:

```text
roi_percentual = roi_liquido / custo_total * 100
```

Quando `custo_total` for zero, o ROI percentual deve ser infinito.

11. Payback em meses:

```text
payback_meses = custo_total / (beneficio_total / 12)
```

Quando `beneficio_total` for zero, o payback deve ser infinito.

### Saidas obrigatorias

A calculadora deve retornar e exibir:

- Horas economizadas no ano.
- Valor das horas economizadas.
- Erros evitados.
- Valor dos erros evitados.
- Valor da receita incremental.
- Beneficio total anual.
- Custo total do primeiro ano.
- ROI liquido.
- ROI percentual arredondado para 1 casa decimal.
- Payback em meses arredondado para 1 casa decimal.

## Experiencia esperada

- A primeira tela deve ser a calculadora utilizavel, nao uma landing page.
- A interface deve permitir ajuste rapido de cenarios durante uma reuniao.
- Os resultados devem ser apresentados em linguagem financeira, com destaque para beneficio anual, ROI percentual e payback.
- Deve haver uma visao de detalhamento que mostre a composicao dos beneficios: produtividade, reducao de erros e receita incremental.
- Deve ser possivel entender rapidamente quais premissas dirigem o resultado.

## Regras de negocio

- A reducao de erros usada no calculo inicial e fixa em 50%.
- Receita incremental deve considerar apenas margem de contribuicao, nao receita bruta.
- Custos do primeiro ano devem somar implementacao e operacao anual.
- Valores monetarios devem ser formatados em moeda configuravel, com padrao em BRL.
- Percentuais de entrada devem aceitar formato decimal interno, mas interface deve poder apresentar formato percentual.
- Campos numericos nao devem aceitar valores negativos, exceto se uma versao futura explicitar cenarios de perda.

## Casos limite

- Se `custo_total` for `0`, `roi_percentual` deve ser exibido como infinito ou "Sem custo informado".
- Se `beneficio_total` for `0`, `payback_meses` deve ser exibido como infinito ou "Sem payback".
- Se todos os campos forem `0`, a calculadora nao deve quebrar.
- Se a margem de contribuicao for `0`, receita incremental nao deve gerar beneficio financeiro.

## Fora de escopo inicial

- Integracao com CRM.
- Exportacao PDF.
- Persistencia multiusuario.
- Autenticacao.
- Comparacao automatica entre multiplos clientes.
- Simulacao probabilistica ou Monte Carlo.

## Criterios de aceite

- Dado um conjunto de entradas valido, a calculadora retorna os mesmos campos e formulas definidos neste spec.
- Alterar qualquer entrada recalcula imediatamente os resultados.
- Resultados monetarios aparecem formatados de forma legivel.
- ROI percentual e payback sao arredondados para 1 casa decimal.
- Os cenarios de custo zero e beneficio zero sao tratados sem erro de divisao.
- A tela principal permite conduzir uma conversa com CFO sem expor detalhes tecnicos de IA.
