import { Decimal } from '@prisma/client/runtime/library';
import { PaymentStatus } from './payment-status.enum';

export interface IPaymentTransaction {
  readonly id: string;
  readonly orderId: string;
  readonly amount: Decimal;
  readonly currency: string;
  readonly status: PaymentStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
