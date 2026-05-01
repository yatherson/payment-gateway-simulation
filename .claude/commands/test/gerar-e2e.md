# Gerar Teste E2E (Playwright/Jest)
Crie um teste de ponta a ponta para o fluxo de $ARGUMENTS.

1. **Mocks**: Utilize o MCP de banco de dados para garantir que o estado inicial seja limpo.
2. **Cenários**:
    - Sucesso (Status 201).
    - Erro de validação (Status 400).
    - Erro de autorização/fraude (Status 403).
3. **Padrão**: Use o `Supertest` para chamadas HTTP ou o Playwright se houver integração de interface.