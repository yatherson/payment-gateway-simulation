import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreditCardModule } from './credit-card/credit-card.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, CreditCardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
