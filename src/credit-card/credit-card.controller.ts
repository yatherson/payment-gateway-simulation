import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { CreditCardResponseDto } from './dto/credit-card-response.dto';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditLimitDto } from './dto/update-credit-limit.dto';

@Controller('credit-cards')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateCreditCardDto,
  ): Promise<CreditCardResponseDto> {
    return this.creditCardService.create(dto);
  }

  @Get()
  async listAll(): Promise<CreditCardResponseDto[]> {
    return this.creditCardService.listAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<CreditCardResponseDto> {
    return this.creditCardService.findById(id);
  }

  @Patch(':id/limit')
  async updateLimit(
    @Param('id') id: string,
    @Body() dto: UpdateCreditLimitDto,
  ): Promise<CreditCardResponseDto> {
    return this.creditCardService.updateLimit(id, dto);
  }

  @Patch(':id/block')
  @HttpCode(HttpStatus.OK)
  async block(@Param('id') id: string): Promise<CreditCardResponseDto> {
    return this.creditCardService.block(id);
  }

  @Patch(':id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancel(@Param('id') id: string): Promise<CreditCardResponseDto> {
    return this.creditCardService.cancel(id);
  }
}
