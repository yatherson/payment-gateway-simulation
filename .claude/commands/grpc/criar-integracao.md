# Criar Integração Assíncrona/gRPC

Gere o código de comunicação entre serviços para `$ARGUMENTS`.

Siga estritamente o `claude.md` e inclua:
1. **Mensageria MSK (Kafka):** Se for assíncrono, demonstre como injetar e usar o `@Inject('KAFKA_SERVICE') ClientKafka` para publicar eventos no formato correto (readonly interfaces).
2. **Ambiente Emulado:** O código do produtor/consumidor deve considerar que o Apache Kafka/MSK está sendo emulado via [Floci.io](https://floci.io) (o que significa conexões TCP locais sem burocracia de IAM no Dev).
3. **Exceções:** Mostre como fazer tratamento de erro num cenário onde o broker falhe (ex: uso de try/catch ou fallback básico).
4. **Explicação:** Ao final, adicione a seção "Pílulas de Conhecimento" explicando como a publicação de eventos garante o desacoplamento e as nuances de rodar isso contra o emulador do Floci.