import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { DatabaseService } from '@src/database/database.service';

@Module({
  providers: [NotificationService, DatabaseService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
