# Criar Fluxo REST Completo

Crie um endpoint REST completo no NestJS para o recurso `$ARGUMENTS`.

Siga estritamente o `claude.md` e inclua:
1. **DTOs:** Request/Response com `class-validator`. Use propriedades `readonly` e `Decimal` (do Prisma) para valores monetários.
2. **Controller:** Apenas roteamento e injeção do Service (`private readonly`). Sem lógica de banco.
3. **Service:** Lógica de negócio e injeção do PrismaService.
4. **Imports:** APENAS explícitos (proibido `import *`).
5. **Observação:** O código deve estar pronto para rodar contra o banco PostgreSQL instanciado no [Floci.io](https://floci.io).
6. **Explicação:** Ao final, adicione a seção " Pílulas de Conhecimento" explicando os Design Patterns e decisões do código.