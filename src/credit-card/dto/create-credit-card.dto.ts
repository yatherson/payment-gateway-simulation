import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { CardBrand } from '@prisma/client';

export class CreateCreditCardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly cardholderName: string;

  @IsEnum(CardBrand)
  readonly brand: CardBrand;

  @IsDateString()
  readonly expirationDate: string;

  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'creditLimit deve ser um valor monetário válido (ex: 1500.00)',
  })
  readonly creditLimit: string;

  @Matches(/^\d{4}$/, {
    message: 'last4Digits deve conter exatamente 4 dígitos numéricos',
  })
  readonly last4Digits: string;
}
