import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

export const S3_CLIENT = 'S3_CLIENT';

export const S3Provider: Provider = {
  provide: S3_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): S3Client => {
    const endpoint = configService.get<string>('AWS_ENDPOINT');
    const region = configService.getOrThrow<string>('AWS_DEFAULT_REGION');

    const config: S3ClientConfig = {
      region,
      ...(endpoint && {
        endpoint,
        forcePathStyle: true,
        credentials: {
          accessKeyId: configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
          secretAccessKey: configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
        },
      }),
    };

    return new S3Client(config);
  },
};
