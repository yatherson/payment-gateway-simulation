import { CardBrand, CardStatus, CreditCard } from '@prisma/client';

export class CreditCardResponseDto {
  readonly id: string;
  readonly maskedNumber: string;
  readonly cardholderName: string;
  readonly brand: CardBrand;
  readonly expirationDate: Date;
  readonly creditLimit: string;
  readonly availableLimit: string;
  readonly status: CardStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(card: CreditCard) {
    this.id = card.id;
    this.maskedNumber = card.maskedNumber;
    this.cardholderName = card.cardholderName;
    this.brand = card.brand;
    this.expirationDate = card.expirationDate;
    this.creditLimit = card.creditLimit.toFixed(2);
    this.availableLimit = card.availableLimit.toFixed(2);
    this.status = card.status;
    this.createdAt = card.createdAt;
    this.updatedAt = card.updatedAt;
  }
}
