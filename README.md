# Case-sistemaprimebox

# PrimeBox ERP, Case de QA

Sistema de gestão real, em produção, de um cliente (fábrica de colchões e estofados). Testado com autorização do proprietário, contra um ambiente de teste isolado (sem dados reais de produção).

> Este repositório contém apenas o material de QA (planilha, relatório de bugs, testes automatizados). O código-fonte da aplicação não está incluído, por ser propriedade do cliente.

**Autor:** Ryan Morais
**Período da rodada:** agosto de 2026
**Ambiente:** URL de testes dedicada, separada de produção

> Este case reflete uma rodada de testes concluída em agosto de 2026. O sistema PrimeBox continua em desenvolvimento ativo após esta data, então detalhes de interface podem ter evoluído desde então.

## Resumo em números

| Camada | Quantidade | Ferramenta |
|---|---|---|
| Testes manuais | 29 casos | Planilha estruturada |
| Testes E2E automatizados | 18 testes | Cypress |
| Testes unitários | 7 testes | Vitest |
| Bugs encontrados e documentados | 9 | Relatório formal |

## Escopo

Cobertos: **Login, Pedidos, Produção, Painel, Clientes, Relatórios**.

Fora do escopo, por decisão consciente: **Estoque e Produtos** (módulos legados, sem uso real no dia a dia do cliente na época da rodada).

## A pirâmide de teste aplicada

Esse projeto foi usado pra montar as três camadas clássicas de teste, cada uma com um papel diferente:

- **Testes manuais (29 casos):** cobertura funcional e exploratória de todos os módulos em uso, incluindo casos de borda (valores inválidos, duplicidade, caracteres especiais) e observações de usabilidade.
- **Testes E2E com Cypress (18 testes):** automação dos fluxos mais estáveis e repetitivos (login, criação de pedidos e ordens de produção, navegação pelo painel), incluindo testes de regressão específicos pra confirmar que bugs já corrigidos continuam corrigidos.
- **Testes unitários com Vitest (7 testes):** validação isolada de funções de lógica pura (formatação monetária, validação de CPF/CNPJ), sem depender de navegador ou interface.

## Bugs encontrados

9 bugs documentados no total, com severidade, passos de reprodução, resultado esperado vs. obtido e recomendação:

- **3 em aberto** na rodada formal (incluindo um problema de contagem de métrica de negócio exibida no painel, com causa raiz investigada e confirmada)
- **1 encontrado e corrigido durante a própria execução** (busca sem suporte a acentuação)
- **5 encontrados e corrigidos durante o desenvolvimento contínuo do sistema** (ordenação de itens, sobrescrita de dados, fragmentação de registros, formatação de campos)

Detalhes completos no relatório de bugs (anexo).

## Destaque técnico

Um dos achados (BUG-003) começou como uma métrica aparentemente errada num card do painel. A investigação cruzou esse dado com um relatório relacionado do próprio sistema, revelando que o número estava correto matematicamente, mas a métrica somava dois conceitos diferentes (pedidos formais e itens de produção avulsos) sob um único rótulo. A causa raiz foi confirmada com evidência antes de qualquer correção ser proposta.

## Testes unitários, um exemplo de valor real

Um dos testes unitários não confirmou que algo funciona, ele **documentou uma limitação real** do sistema: a validação de CPF/CNPJ hoje confere apenas a quantidade de dígitos, sem checar o dígito verificador matemático. O teste comprova esse comportamento com evidência de código, servindo como registro técnico pra uma decisão futura (se vale a pena implementar a validação completa).

## Arquivos deste case

- `PrimeBox_Casos_de_Teste.xlsx`, planilha completa com os 29 casos, status, prioridade e observações
- `PrimeBox_Relatorio_de_Bugs.pdf`, relatório formal com os 9 bugs
- `cypress/`, os 18 testes E2E (login, pedidos, produção, painel)
- `vitest/`, os 7 testes unitários (validações de moeda e cliente)

## Stack utilizada

Cypress (E2E), Vitest (unitário), TypeScript, Next.js (aplicação testada), Excel e Word/PDF (documentação de testes e bugs).
