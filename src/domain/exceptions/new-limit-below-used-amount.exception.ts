import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DomainException } from './domain.exception';

export class NewLimitBelowUsedAmountException extends DomainException {
  constructor(newLimit: Prisma.Decimal, usedAmount: Prisma.Decimal) {
    super(
      '/errors/new-limit-below-used-amount',
      'Limite inferior ao valor utilizado',
      `O novo limite de R$ ${newLimit.toFixed(2)} não pode ser inferior ao valor já utilizado de R$ ${usedAmount.toFixed(2)} pelo titular.`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
