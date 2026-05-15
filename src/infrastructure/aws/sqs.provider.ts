import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';

export const SQS_CLIENT = 'SQS_CLIENT';

export const SqsProvider: Provider = {
  provide: SQS_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): SQSClient => {
    const endpoint = configService.get<string>('AWS_ENDPOINT');
    const region = configService.getOrThrow<string>('AWS_DEFAULT_REGION');

    const config: SQSClientConfig = {
      region,
      ...(endpoint && {
        endpoint,
        credentials: {
          accessKeyId: configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
          secretAccessKey: configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
        },
      }),
    };

    return new SQSClient(config);
  },
};
