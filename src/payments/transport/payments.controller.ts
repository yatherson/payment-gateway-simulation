import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PaymentsService } from '../application/payments.service';
import { CreatePaymentDto } from '../application/dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async create(@Body() dto: CreatePaymentDto): Promise<void> {
    await this.paymentsService.sendToQueue(dto);
  }
}
