# Calculadora de ROI de Ecossistema de IA - Tasks

## Implementacao

- [X] Criar modulo do motor `calcularRoiEcossistema`.
- [X] Definir tipos ou schema de entrada e saida.
- [X] Aplicar defaults para campos opcionais.
- [X] Implementar validacao e normalizacao de numeros.
- [X] Implementar calculo de horas economizadas.
- [X] Implementar calculo de erros evitados com reducao fixa de 50%.
- [X] Implementar calculo de receita incremental por margem de contribuicao.
- [X] Implementar calculo de beneficio total, custo total, ROI liquido, ROI percentual e payback.
- [X] Tratar custo zero e beneficio zero sem erro de divisao.
- [X] Criar formatadores de moeda, percentual, meses, horas e quantidades.

## Interface

- [X] Construir tela principal como calculadora utilizavel.
- [X] Criar painel de premissas com inputs numericos.
- [X] Criar controles de taxa de erro e margem de contribuicao.
- [X] Criar painel de resultados com beneficio anual, ROI, payback e ROI liquido.
- [X] Criar detalhamento por produtividade, erros evitados, receita incremental e custos.
- [X] Criar acao para restaurar defaults.
- [X] Garantir layout responsivo para uso em reuniao presencial ou remota.

## Testes

- [X] Testar calculo base com exemplo do spec.
- [X] Testar ROI infinito quando custo total for zero.
- [X] Testar payback infinito quando beneficio total for zero.
- [X] Testar receita incremental mensal multiplicada por 12 e pela margem.
- [X] Testar erros evitados como 50% dos erros atuais.
- [X] Testar arredondamento de ROI percentual e payback para 1 casa decimal.
- [X] Testar que valores negativos sao bloqueados ou normalizados conforme decisao de implementacao.

## Qualidade

- [X] Revisar textos da interface para linguagem de negocio.
- [X] Evitar termos tecnicos de IA nos resultados principais.
- [X] Validar que a calculadora funciona sem backend.
- [X] Validar que alterar inputs recalcula resultados imediatamente.
- [X] Revisar acessibilidade basica de labels, foco e contraste.
