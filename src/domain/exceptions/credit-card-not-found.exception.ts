import { HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception';

export class CreditCardNotFoundException extends DomainException {
  constructor(id: string) {
    super(
      '/errors/credit-card-not-found',
      'Cartão de crédito não encontrado',
      `Cartão de crédito com id '${id}' não foi encontrado.`,
      HttpStatus.NOT_FOUND,
    );
  }
}
