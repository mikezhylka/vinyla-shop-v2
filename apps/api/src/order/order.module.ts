import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseService } from '@src/database/database.service';

import { NotificationModule } from '@src/notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [OrderService, DatabaseService],
  controllers: [OrderController],
})
export class OrderModule {}
