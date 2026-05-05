# Criar Exceção de Domínio
Crie uma nova exceção de negócio seguindo as diretrizes inegociáveis:

1. **Nome do Arquivo**: kebab-case (ex: $ARGUMENTS-exception.ts).
2. **Herança**: Deve estender `DomainException`.
3. **Mensagem**: Deve ser clara, em português, e aceitar parâmetros no construtor se necessário.
4. **Localização**: Salvar em `src/domain/exceptions/`.

Exemplo de uso: /domain/criar-excecao card-expired/