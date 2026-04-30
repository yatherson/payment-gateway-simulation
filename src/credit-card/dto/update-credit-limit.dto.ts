import { Matches } from 'class-validator';

export class UpdateCreditLimitDto {
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'newLimit deve ser um valor monetário válido (ex: 2000.00)',
  })
  readonly newLimit: string;
}
