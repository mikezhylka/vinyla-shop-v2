/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { MailerService } from '@nestjs-modules/mailer';
import { DatabaseService } from '@src/database/database.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let mailerService: jest.Mocked<MailerService>;
  let databaseService: jest.Mocked<DatabaseService>;

  beforeEach(async () => {
    const mockMailerService = {
      sendMail: jest.fn(),
    };

    const mockDatabaseService = {
      registrationVerificationCode: {
        create: jest.fn(),
        findFirst: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: MailerService, useValue: mockMailerService },
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    mailerService = module.get(MailerService);
    databaseService = module.get(DatabaseService);
  });

  describe('createVerificationCode', () => {
    it('should create and return a 6-digit verification code', async () => {
      const email = 'test@example.com';
      (
        databaseService.registrationVerificationCode.create as jest.Mock
      ).mockResolvedValue({
        code: '123456',
      } as any);

      const result = await service.createVerificationCode(email);

      expect(result.success).toBe(true);
      expect(result.code).toHaveLength(6);
      expect(
        databaseService.registrationVerificationCode.create,
      ).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email,
          code: expect.stringMatching(/^\d{6}$/),
          expiresAt: expect.any(Date),
        }),
      });
    });
  });

  describe('sendVerificationEmail', () => {
    it('should delete existing code, create a new one, and send an email', async () => {
      const email = 'test@example.com';
      (
        databaseService.registrationVerificationCode.findFirst as jest.Mock
      ).mockResolvedValue({ id: 1 } as any);
      (
        databaseService.registrationVerificationCode.create as jest.Mock
      ).mockResolvedValue({ code: '654321' } as any);

      await service.sendVerificationEmail(email);

      expect(
        databaseService.registrationVerificationCode.findFirst,
      ).toHaveBeenCalledWith({
        where: { email },
      });
      expect(
        databaseService.registrationVerificationCode.delete,
      ).toHaveBeenCalledWith({
        where: { email },
      });
      expect(
        databaseService.registrationVerificationCode.create,
      ).toHaveBeenCalled();
      expect(mailerService.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: email,
          subject: expect.stringContaining('Verification Code'),
          context: expect.objectContaining({
            code: expect.any(Object),
          }),
        }),
      );
    });

    it('should just create a new one and send email if no existing code', async () => {
      const email = 'test@example.com';
      (
        databaseService.registrationVerificationCode.findFirst as jest.Mock
      ).mockResolvedValue(null);
      (
        databaseService.registrationVerificationCode.create as jest.Mock
      ).mockResolvedValue({ code: '654321' } as any);

      await service.sendVerificationEmail(email);

      expect(
        databaseService.registrationVerificationCode.findFirst,
      ).toHaveBeenCalledWith({
        where: { email },
      });
      expect(
        databaseService.registrationVerificationCode.delete,
      ).not.toHaveBeenCalled();
      expect(mailerService.sendMail).toHaveBeenCalled();
    });
  });
});
