import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AwsModule } from "./infrastructure/aws/aws.module";
import { CreditCardModule } from "./credit-card/credit-card.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AwsModule,
    CreditCardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
