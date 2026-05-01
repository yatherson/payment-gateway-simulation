import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3Provider } from './s3.provider';

@Module({
  imports: [ConfigModule],
  providers: [S3Provider],
  exports: [S3Provider],
})
export class AwsModule {}
