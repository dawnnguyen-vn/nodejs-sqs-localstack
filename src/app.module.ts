import { Module } from '@nestjs/common';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [MailModule],
})
export class AppModule {}
