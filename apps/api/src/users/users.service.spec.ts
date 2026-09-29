/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseService } from '@src/database/database.service';
import { AuthService } from '@src/auth/auth.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let databaseService: jest.Mocked<DatabaseService>;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const mockDatabaseService = {
      user: { update: jest.fn(), findUnique: jest.fn(), create: jest.fn() },
      profile: { findFirst: jest.fn() },
      registrationVerificationCode: {
        findFirst: jest.fn(),
        delete: jest.fn(),
      },
    };

    const mockAuthService = {
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    databaseService = module.get(DatabaseService);
    authService = module.get(AuthService);
  });

  describe('verifyUser', () => {
    const validDto = { email: 'test@test.com', code: '123456' };

    it('should throw BadRequestException if code not found', async () => {
      (
        databaseService.registrationVerificationCode.findFirst as jest.Mock
      ).mockResolvedValue(null);

      await expect(service.verifyUser(validDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.verifyUser(validDto)).rejects.toMatchObject({
        response: expect.objectContaining({
          code: 'VERIFICATION_CODE_NOT_FOUND',
        }),
      });
    });

    it('should throw BadRequestException if code is expired', async () => {
      const expiredDate = new Date(Date.now() - 10000);
      (
        databaseService.registrationVerificationCode.findFirst as jest.Mock
      ).mockResolvedValue({
        email: validDto.email,
        code: '123456',
        expiresAt: expiredDate,
      } as any);

      await expect(service.verifyUser(validDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.verifyUser(validDto)).rejects.toMatchObject({
        response: expect.objectContaining({
          code: 'VERIFICATION_CODE_EXPIRED',
        }),
      });
      expect(
        databaseService.registrationVerificationCode.delete,
      ).toHaveBeenCalledWith({
        where: { email: validDto.email },
      });
    });

    it('should throw BadRequestException if code is invalid', async () => {
      const validDate = new Date(Date.now() + 10000);
      (
        databaseService.registrationVerificationCode.findFirst as jest.Mock
      ).mockResolvedValue({
        email: validDto.email,
        code: '654321', // mismatch
        expiresAt: validDate,
      } as any);

      await expect(service.verifyUser(validDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.verifyUser(validDto)).rejects.toMatchObject({
        response: expect.objectContaining({
          code: 'INVALID_VERIFICATION_CODE',
        }),
      });
    });

    it('should throw UnauthorizedException if profile not found', async () => {
      const validDate = new Date(Date.now() + 10000);
      (
        databaseService.registrationVerificationCode.findFirst as jest.Mock
      ).mockResolvedValue({
        email: validDto.email,
        code: validDto.code,
        expiresAt: validDate,
      } as any);
      (databaseService.user.update as jest.Mock).mockResolvedValue({
        id: 1,
        email: validDto.email,
      } as any);
      (databaseService.profile.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.verifyUser(validDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should successfully verify user, delete code, and login', async () => {
      const validDate = new Date(Date.now() + 10000);
      const mockUser = { id: 1, email: validDto.email, isVerified: true };
      const mockProfile = { id: 1, userId: 1, name: 'Test' };

      (
        databaseService.registrationVerificationCode.findFirst as jest.Mock
      ).mockResolvedValue({
        email: validDto.email,
        code: validDto.code,
        expiresAt: validDate,
      } as any);
      (databaseService.user.update as jest.Mock).mockResolvedValue(
        mockUser as any,
      );
      (databaseService.profile.findFirst as jest.Mock).mockResolvedValue(
        mockProfile as any,
      );
      authService.login.mockResolvedValue({ access: { token: 'jwt' } } as any);

      const result = await service.verifyUser(validDto);

      expect(databaseService.user.update).toHaveBeenCalledWith({
        where: { email: validDto.email },
        data: { isVerified: true },
      });
      expect(
        databaseService.registrationVerificationCode.delete,
      ).toHaveBeenCalledWith({
        where: { email: validDto.email },
      });
      expect(authService.login).toHaveBeenCalledWith({
        ...mockUser,
        profile: mockProfile,
      });
      expect(result).toEqual({ access: { token: 'jwt' } });
    });
  });
});
