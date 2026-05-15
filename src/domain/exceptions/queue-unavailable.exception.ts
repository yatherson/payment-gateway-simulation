import { HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception';

export class QueueUnavailableException extends DomainException {
  constructor(cause: string) {
    super(
      '/errors/queue-unavailable',
      'Fila de pagamentos indisponível',
      `Falha ao enviar mensagem para a fila SQS: ${cause}`,
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
