import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post('/send-verification-email')
  async sendVerificationEmail(@Body('email') email: string) {
    return this.notificationService.sendVerificationEmail(email);
  }
}
