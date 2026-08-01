import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '@src/database/database.service';
import { UsersService } from '@src/users/users.service';
import { AuthService } from './auth.service';

const mockRepositories = {
  mockUserRepository: {
    findByEmail: jest.fn(),
    create: jest.fn(),
    createSession: jest.fn(),
  },
  mockJwtRepository: {
    decode: jest.fn(),
    signAsync: jest.fn(),
  },
  mockConfigRepository: {
    getOrThrow: jest.fn(),
  },

  mockDatabaseRepositoty: {
    session: jest.fn(),
  },
};

const mockUser = {
  id: 1,
  email: 'misha@gmail.com',
  password: 'hashedPassword',
  name: 'Test User',
  createdAt: new Date(),
};

const mockTokens = {
  accessToken: 'access-token',
  refreshToken: 'new-refresh-token',
  accessExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
  refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
};

const registerResult: any = {
  profile: {
    id: 1,
    userId: mockUser.id,
    name: mockUser.name,
    avatar: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: { email: mockUser.email },
  },
  access: {
    token: mockTokens.accessToken,
    expiresAt: mockTokens.accessExpiresAt,
  },
  refresh: {
    token: mockTokens.refreshToken,
    expiresAt: mockTokens.refreshExpiresAt,
  },
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockRepositories.mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockRepositories.mockJwtRepository,
        },
        {
          provide: ConfigService,
          useValue: mockRepositories.mockConfigRepository,
        },
        {
          provide: DatabaseService,
          useValue: mockRepositories.mockDatabaseRepositoty,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Register', () => {
    test('should throw exception if email is already used', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt, id, ...registerDto } = mockUser;

      mockRepositories.mockUserRepository.findByEmail.mockResolvedValue(true);

      await expect(service.register(registerDto)).rejects.toThrow(
        new BadRequestException('This email is already used.'),
      );
    });

    test('should throw exception if user was not created', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt, id, ...registerDto } = mockUser;

      mockRepositories.mockUserRepository.findByEmail.mockResolvedValue(false);
      mockRepositories.mockUserRepository.create.mockReturnValue(false);

      await expect(service.register(registerDto)).rejects.toThrow(
        new BadRequestException('Something went wrong.'),
      );
    });

    test('should call login if everything is correct', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt, id, ...registerDto } = mockUser;

      const createdUser = { id, ...registerDto };

      const loginSpy = jest
        .spyOn(service, 'login')
        .mockResolvedValue(registerResult);

      mockRepositories.mockUserRepository.findByEmail.mockResolvedValue(null);
      mockRepositories.mockUserRepository.create.mockReturnValue(createdUser);

      await service.register(registerDto);

      expect(loginSpy).toHaveBeenCalledWith(createdUser);
    });
  });
});
