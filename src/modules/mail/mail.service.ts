import { Injectable } from '@nestjs/common';

import {
  ReceiveMessageCommand,
  ReceiveMessageCommandOutput,
  SendMessageCommand,
  SendMessageCommandInput,
  SendMessageCommandOutput,
  SQSClient,
} from '@aws-sdk/client-sqs';
import { Message } from './mail.controller';

@Injectable()
export class MailService {
  private credentials = {
    accessKeyId: 'test',
    secretAccessKey: 'test',
  };
  private client = new SQSClient({
    credentials: this.credentials,
    region: 'us-east-1',
    endpoint: {
      url: new URL('http://localstack:4566'),
      // url: new URL('http://localhost:4566') change localstack to localhost when run nestjs app in local machine,
    },
  });
  private queueUrl =
    'http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/localstack-queue';

  async getSQS(): Promise<ReceiveMessageCommandOutput> {
    const input = {
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 10,
    };
    const command = new ReceiveMessageCommand(input);
    const response = await this.client.send(command);
    return response;
  }

  async sendToSQS(message: Message): Promise<SendMessageCommandOutput> {
    const input: SendMessageCommandInput = {
      QueueUrl: this.queueUrl,
      MessageBody: message.message,
    };
    try {
      const sendCommand = new SendMessageCommand(input);
      const response = await this.client.send(sendCommand);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
