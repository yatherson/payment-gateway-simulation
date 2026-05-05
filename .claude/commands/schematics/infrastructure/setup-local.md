# Configurar Recurso AWS Local (floci.io)
Configure a simulação do serviço $ARGUMENTS utilizando a biblioteca floci.io.

1. Gere o código de inicialização no arquivo `src/infra/local-aws-setup.ts`.
2. Garanta que as credenciais sejam dummy (test/test).
3. Se for SQS, crie a fila necessária para o Gateway.
4. Se for S3, configure o bucket de logs de transação.
5. Adicione um comentário explicando como o floci.io está interceptando as chamadas do SDK da AWS.