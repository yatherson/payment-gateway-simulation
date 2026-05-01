# Criar Módulo NestJS - Gateway
Crie a estrutura completa para o recurso $ARGUMENTS seguindo as melhores práticas:

1. **Arquitetura**: Controller -> Service -> Repository (Prisma).
2. **DTOs**: Use class-validator e class-transformer (nada de interfaces puras para validação de entrada).
3. **Injeção de Dependência**: Use nomes descritivos e evite `forwardRef`.
4. **AWS Mock**: Se o recurso interagir com S3 ou SQS, use o `floci.io` para simular o serviço.
5. **Proibido**: Importações com `*`. Importe apenas o que for necessário.

Gere:
- src/$ARGUMENTS/$ARGUMENTS.controller.ts
- src/$ARGUMENTS/$ARGUMENTS.service.ts
- src/$ARGUMENTS/dto/create-$ARGUMENTS.dto.ts