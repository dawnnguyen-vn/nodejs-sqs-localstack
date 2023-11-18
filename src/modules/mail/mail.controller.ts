import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import {
  ReceiveMessageCommandOutput,
  SendMessageCommandOutput,
} from '@aws-sdk/client-sqs';

export type Message = {
  message: string;
};

@Controller('mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Get()
  test(): Promise<ReceiveMessageCommandOutput> {
    return this.mailService.getSQS();
  }

  @Post('send')
  send(@Body() message: Message): Promise<SendMessageCommandOutput> {
    return this.mailService.sendToSQS(message);
  }
}
