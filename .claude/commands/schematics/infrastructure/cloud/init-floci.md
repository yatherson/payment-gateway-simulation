# Inicializar floci.io (Simulação AWS)
Configure a integração inicial do floci.io no projeto NestJS para o serviço $ARGUMENTS.

### Regras de Ouro:
1. **Importações Nomeadas**: Nunca use `import * as AWS`. Importe apenas o que for necessário de `@aws-sdk/client-$ARGUMENTS`.
2. **Ciclo de Vida**: A chamada `mock$ARGUMENTS()` deve ocorrer no `onModuleInit` do Service ou Provider.
3. **Provider Pattern**: Crie um Factory Provider ou um Service dedicado para encapsular o Client da AWS.
4. **Sem Código Morto**: Não gere funções de exemplo que não serão utilizadas imediatamente.

Gere o arquivo `src/infrastructure/aws/$ARGUMENTS.provider.ts`.