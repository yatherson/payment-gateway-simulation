import { Injectable } from '@nestjs/common';
import { CardBrand, CardStatus, CreditCard, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

interface CreateCardInput {
  readonly maskedNumber: string;
  readonly cardholderName: string;
  readonly brand: CardBrand;
  readonly expirationDate: Date;
  readonly creditLimit: Prisma.Decimal;
}

interface UpdateLimitInput {
  readonly newLimit: Prisma.Decimal;
  readonly newAvailableLimit: Prisma.Decimal;
}

@Injectable()
export class CreditCardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCardInput): Promise<CreditCard> {
    return this.prisma.creditCard.create({
      data: {
        ...data,
        availableLimit: data.creditLimit,
      },
    });
  }

  async findAll(): Promise<CreditCard[]> {
    return this.prisma.creditCard.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<CreditCard | null> {
    return this.prisma.creditCard.findUnique({ where: { id } });
  }

  async updateStatus(id: string, status: CardStatus): Promise<CreditCard> {
    return this.prisma.creditCard.update({
      where: { id },
      data: { status },
    });
  }

  async updateLimit(id: string, data: UpdateLimitInput): Promise<CreditCard> {
    return this.prisma.creditCard.update({
      where: { id },
      data: {
        creditLimit: data.newLimit,
        availableLimit: data.newAvailableLimit,
      },
    });
  }
}
