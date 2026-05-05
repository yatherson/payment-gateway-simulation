import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DomainException } from './domain.exception';

export class CreditLimitNotPositiveException extends DomainException {
  constructor(attemptedLimit: Prisma.Decimal) {
    super(
      '/errors/credit-limit-not-positive',
      'Limite de crédito inválido',
      `O limite de crédito deve ser maior que zero. Valor recebido: R$ ${attemptedLimit.toFixed(2)}.`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
