import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3Provider } from './s3.provider';
import { SqsProvider } from './sqs.provider';

@Module({
  imports: [ConfigModule],
  providers: [S3Provider, SqsProvider],
  exports: [S3Provider, SqsProvider],
})
export class AwsModule {}
