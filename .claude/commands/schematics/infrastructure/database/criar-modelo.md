# Criar Modelo Prisma e Persistência

Crie a infraestrutura de dados para a entidade `$ARGUMENTS`.

Siga estritamente o `claude.md` e inclua:
1. **Prisma Schema:** Código do modelo para adicionar no `schema.prisma`.
    - IDs devem ser `@default(uuid())`.
    - Valores monetários DEVEM ser `@db.Decimal(10, 2)`.
    - Inclua `@map("nome_tabela_snake_case")` para boas práticas no Postgres.
2. **Repository/Service:** O serviço NestJS encapsulando os métodos CRUD básicos.
3. **Ambiente:** Considere que o PostgreSQL rodará localmente via [Floci.io](https://floci.io), logo, garanta que tipos do Prisma sejam importados e retornados corretamente (nada de `any`).
4. **Explicação:** Ao final, adicione a seção " Pílulas de Conhecimento" explicando os mapeamentos e as vantagens de separar os Repository/Services no NestJS.