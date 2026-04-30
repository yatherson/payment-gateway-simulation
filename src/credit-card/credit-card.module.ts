import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { CreditCardRepository } from './credit-card.repository';
import { CreditCardService } from './credit-card.service';

@Module({
  controllers: [CreditCardController],
  providers: [CreditCardService, CreditCardRepository],
})
export class CreditCardModule {}
