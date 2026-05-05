import { ConflictException, Injectable } from '@nestjs/common';
import { CardStatus, CreditCard, Prisma } from '@prisma/client';
import { CreditCardRepository } from './credit-card.repository';
import { CreditCardResponseDto } from './dto/credit-card-response.dto';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditLimitDto } from './dto/update-credit-limit.dto';
import { CreditCardNotFoundException } from '../domain/exceptions/credit-card-not-found.exception';
import { CreditLimitNotPositiveException } from '../domain/exceptions/credit-limit-not-positive.exception';
import { NewLimitBelowUsedAmountException } from '../domain/exceptions/new-limit-below-used-amount.exception';

@Injectable()
export class CreditCardService {
  constructor(private readonly creditCardRepository: CreditCardRepository) {}

  async create(dto: CreateCreditCardDto): Promise<CreditCardResponseDto> {
    const creditLimit = new Prisma.Decimal(dto.creditLimit);

    if (creditLimit.lte(0)) {
      throw new CreditLimitNotPositiveException(creditLimit);
    }

    const card = await this.creditCardRepository.create({
      maskedNumber: this.maskCardNumber(dto.last4Digits),
      cardholderName: dto.cardholderName,
      brand: dto.brand,
      expirationDate: new Date(dto.expirationDate),
      creditLimit,
    });

    return new CreditCardResponseDto(card);
  }

  async listAll(): Promise<CreditCardResponseDto[]> {
    const cards = await this.creditCardRepository.findAll();
    return cards.map((card) => new CreditCardResponseDto(card));
  }

  async findById(id: string): Promise<CreditCardResponseDto> {
    const card = await this.findCardOrThrow(id);
    return new CreditCardResponseDto(card);
  }

  async updateLimit(id: string, dto: UpdateCreditLimitDto): Promise<CreditCardResponseDto> {
    const card = await this.findCardOrThrow(id);

    if (card.status !== CardStatus.ACTIVE) {
      throw new ConflictException('Apenas cartões com status ATIVO podem ter o limite alterado.');
    }

    const newLimit = new Prisma.Decimal(dto.newLimit);
    const delta = newLimit.minus(card.creditLimit);
    const newAvailableLimit = card.availableLimit.plus(delta);

    if (newAvailableLimit.lt(0)) {
      const usedAmount = card.creditLimit.minus(card.availableLimit);
      throw new NewLimitBelowUsedAmountException(newLimit, usedAmount);
    }

    const updatedCard = await this.creditCardRepository.updateLimit(id, {
      newLimit,
      newAvailableLimit,
    });

    return new CreditCardResponseDto(updatedCard);
  }

  async block(id: string): Promise<CreditCardResponseDto> {
    const card = await this.findCardOrThrow(id);

    if (card.status === CardStatus.CANCELLED) {
      throw new ConflictException('Cartão cancelado não pode ser bloqueado.');
    }

    if (card.status === CardStatus.BLOCKED) {
      throw new ConflictException('Cartão já se encontra bloqueado.');
    }

    const updatedCard = await this.creditCardRepository.updateStatus(id, CardStatus.BLOCKED);
    return new CreditCardResponseDto(updatedCard);
  }

  async cancel(id: string): Promise<CreditCardResponseDto> {
    const card = await this.findCardOrThrow(id);

    if (card.status === CardStatus.CANCELLED) {
      throw new ConflictException('Cartão já se encontra cancelado.');
    }

    const updatedCard = await this.creditCardRepository.updateStatus(id, CardStatus.CANCELLED);
    return new CreditCardResponseDto(updatedCard);
  }

  private async findCardOrThrow(id: string): Promise<CreditCard> {
    const card = await this.creditCardRepository.findById(id);

    if (!card) {
      throw new CreditCardNotFoundException(id);
    }

    return card;
  }

  private maskCardNumber(last4Digits: string): string {
    return `****-****-****-${last4Digits}`;
  }
}
