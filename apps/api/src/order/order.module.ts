import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseService } from '@src/database/database.service';

@Module({
  providers: [OrderService, DatabaseService],
  controllers: [OrderController],
})
export class OrderModule {}
