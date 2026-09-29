import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { DatabaseService } from '@src/database/database.service';
import { NotificationService } from '@src/notification/notification.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    process.env.STRIPE_SECRET_KEY = 'test_key';
    const mockDatabaseService = {};
    const mockNotificationService = {
      sendOrderConfirmationEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
