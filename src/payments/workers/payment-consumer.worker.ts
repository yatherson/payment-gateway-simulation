import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteMessageCommand,
  Message,
  ReceiveMessageCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';
import { SQS_CLIENT } from '../../infrastructure/aws/sqs.provider';

interface PaymentMessage {
  readonly creditCardId: string;
  readonly amount: string;
  readonly description: string;
}

@Injectable()
export class PaymentConsumerWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PaymentConsumerWorker.name);
  private isRunning = true;

  constructor(
    @Inject(SQS_CLIENT) private readonly sqsClient: SQSClient,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit(): void {
    void this.poll();
  }

  onModuleDestroy(): void {
    this.isRunning = false;
  }

  private async poll(): Promise<void> {
    const queueUrl = this.configService.getOrThrow<string>('SQS_PAYMENT_QUEUE_URL');

    while (this.isRunning) {
      try {
        const { Messages } = await this.sqsClient.send(
          new ReceiveMessageCommand({
            QueueUrl: queueUrl,
            MaxNumberOfMessages: 10,
            WaitTimeSeconds: 20,
          }),
        );

        if (!Messages?.length) continue;

        for (const message of Messages) {
          await this.processMessage(queueUrl, message);
        }
      } catch (error: unknown) {
        const cause = error instanceof Error ? error.message : String(error);
        this.logger.error(`Erro ao consumir fila: ${cause}`);
      }
    }
  }

  private async processMessage(queueUrl: string, message: Message): Promise<void> {
    let parsed: PaymentMessage;

    try {
      parsed = JSON.parse(message.Body ?? '') as PaymentMessage;
    } catch {
      this.logger.error(`Poison pill descartada. Body inválido: ${message.Body}`);

      if (!message.ReceiptHandle) return;

      await this.sqsClient.send(
        new DeleteMessageCommand({ QueueUrl: queueUrl, ReceiptHandle: message.ReceiptHandle }),
      );
      return;
    }

    this.logger.log(`Processando pagamento: creditCardId=${parsed.creditCardId} amount=${parsed.amount}`);

    if (!message.ReceiptHandle) {
      this.logger.warn('Mensagem sem ReceiptHandle, impossível deletar da fila.');
      return;
    }

    await this.sqsClient.send(
      new DeleteMessageCommand({
        QueueUrl: queueUrl,
        ReceiptHandle: message.ReceiptHandle,
      }),
    );
  }
}
