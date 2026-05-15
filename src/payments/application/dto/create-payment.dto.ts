import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsUUID()
  readonly creditCardId!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'amount must be a valid monetary value (e.g., 150.00)',
  })
  readonly amount!: string;

  @IsString()
  @IsNotEmpty()
  readonly description!: string;
}
