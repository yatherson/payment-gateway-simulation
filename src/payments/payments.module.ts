import { Module } from '@nestjs/common';
import { AwsModule } from '../infrastructure/aws/aws.module';
import { PaymentsService } from './application/payments.service';
import { PaymentsController } from './transport/payments.controller';
import { PaymentConsumerWorker } from './workers/payment-consumer.worker';

@Module({
  imports: [AwsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentConsumerWorker],
})
export class PaymentsModule {}
