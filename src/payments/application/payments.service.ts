import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { Decimal } from '@prisma/client/runtime/library';
import { SQS_CLIENT } from '../../infrastructure/aws/sqs.provider';
import { QueueUnavailableException } from '../../domain/exceptions/queue-unavailable.exception';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(SQS_CLIENT) private readonly sqsClient: SQSClient,
    private readonly configService: ConfigService,
  ) {}

  async sendToQueue(dto: CreatePaymentDto): Promise<void> {
    const queueUrl = this.configService.getOrThrow<string>('SQS_PAYMENT_QUEUE_URL');

    const amount = new Decimal(dto.amount).toFixed(2);

    const command = new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify({ ...dto, amount }),
    });

    try {
      await this.sqsClient.send(command);
    } catch (error: unknown) {
      const cause = error instanceof Error ? error.message : String(error);
      throw new QueueUnavailableException(cause);
    }
  }
}
