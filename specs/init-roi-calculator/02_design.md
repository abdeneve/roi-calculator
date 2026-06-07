# Calculadora de ROI de Ecossistema de IA - Design

## Tipo de produto

Aplicacao web interativa de pagina unica para simulacao financeira consultiva.

## Arquitetura funcional

### Camadas

- Motor de calculo: funcao pura responsavel por transformar entradas em indicadores financeiros.
- Adaptador de formatacao: converte numeros em moeda, percentuais, meses e unidades.
- Interface de simulacao: coleta premissas e exibe resultados.
- Validacao: garante limites numericos, defaults e mensagens para casos especiais.

## Modelo de dados

### Entrada

```ts
type RoiInput = {
  numFuncionarios: number;
  horasEconomizadasDia: number;
  custoHoraFuncionario: number;
  diasUteisAno: number;
  taxaErroAtual: number;
  custoMedioErro: number;
  tarefasDiaPorFuncionario: number;
  receitaIncrementalMensal: number;
  margemContribuicao: number;
  custoImplementacao: number;
  custoOperacaoAnual: number;
  moeda: string;
};
```

### Resultado

```ts
type RoiResult = {
  horasEconomizadasAno: number;
  valorHorasEconomizadas: number;
  errosEvitados: number;
  valorErrosEvitados: number;
  valorReceitaIncremental: number;
  beneficioTotalAnual: number;
  custoTotalPrimeiroAno: number;
  roiLiquido: number;
  roiPercentual: number;
  paybackMeses: number;
};
```

## Motor de calculo

O motor deve ser implementado como funcao pura, sem dependencia de UI, estado global ou chamadas externas.

```ts
function calcularRoiEcossistema(input: RoiInput): RoiResult
```

### Pseudocodigo

```text
horasTotais = numFuncionarios * horasEconomizadasDia * diasUteisAno
valorHoras = horasTotais * custoHoraFuncionario

errosAtuaisAno = numFuncionarios * tarefasDiaPorFuncionario * diasUteisAno * taxaErroAtual
errosEvitados = errosAtuaisAno * 0.50
valorErros = errosEvitados * custoMedioErro

valorReceita = receitaIncrementalMensal * 12 * margemContribuicao
beneficioTotal = valorHoras + valorErros + valorReceita

custoTotal = custoImplementacao + custoOperacaoAnual
roiLiquido = beneficioTotal - custoTotal

roiPercentual = custoTotal > 0 ? roiLiquido / custoTotal * 100 : Infinity
paybackMeses = beneficioTotal > 0 ? custoTotal / (beneficioTotal / 12) : Infinity
```

## Interface

### Layout principal

- Coluna esquerda: premissas editaveis.
- Coluna direita: resultados principais.
- Secao inferior: detalhamento dos beneficios e custos.

### Controles

- Inputs numericos para funcionarios, horas, custos, tarefas e receita.
- Sliders ou steppers para taxa de erro e margem de contribuicao.
- Campo seletor de moeda, com BRL como padrao.
- Botao para restaurar premissas padrao.

### Resultados destacados

- Beneficio total anual.
- ROI percentual.
- Payback em meses.
- ROI liquido.

### Detalhamento

- Card ou bloco de produtividade: horas economizadas e valor.
- Card ou bloco de qualidade: erros evitados e valor.
- Card ou bloco de crescimento: receita incremental ponderada pela margem.
- Bloco de custos: implementacao, operacao anual e custo total.

## Validacao

- Todo campo numerico deve ser normalizado para numero finito.
- Valores vazios devem ser tratados como `0` ou default explicito do campo.
- Percentuais devem ser limitados entre `0` e `1` no motor.
- A UI pode apresentar percentuais como `0%` a `100%`.
- Valores monetarios e quantidades nao podem ser negativos.

## Formatacao

- Moeda padrao: `BRL`.
- Locale padrao: `pt-BR`.
- Valores monetarios devem usar formatacao compacta apenas quando isso melhorar a leitura; o valor completo deve continuar disponivel em tooltip ou detalhe.
- Quantidade de horas deve ser arredondada para no maximo 1 casa decimal.
- Quantidade de erros evitados deve ser arredondada para no maximo 1 casa decimal.

## Testabilidade

O motor deve ter testes unitarios cobrindo:

- Calculo base com todos os campos preenchidos.
- Custo total zero.
- Beneficio total zero.
- Receita incremental com margem.
- Erros evitados com taxa de erro padrao.
- Arredondamento de ROI percentual e payback.

## Exemplo de entrada

```json
{
  "numFuncionarios": 50,
  "horasEconomizadasDia": 1.5,
  "custoHoraFuncionario": 80,
  "diasUteisAno": 250,
  "taxaErroAtual": 0.15,
  "custoMedioErro": 50,
  "tarefasDiaPorFuncionario": 40,
  "receitaIncrementalMensal": 30000,
  "margemContribuicao": 0.3,
  "custoImplementacao": 120000,
  "custoOperacaoAnual": 60000,
  "moeda": "BRL"
}
```

## Exemplo de resultado esperado

```json
{
  "horasEconomizadasAno": 18750,
  "valorHorasEconomizadas": 1500000,
  "errosEvitados": 37500,
  "valorErrosEvitados": 1875000,
  "valorReceitaIncremental": 108000,
  "beneficioTotalAnual": 3483000,
  "custoTotalPrimeiroAno": 180000,
  "roiLiquido": 3303000,
  "roiPercentual": 1835,
  "paybackMeses": 0.6
}
```
