import { ClientProfile, CreateUserDto } from '@monorepo/shared-types';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '@src/database/database.service';
import * as bcrypt from 'bcryptjs';
import { Passwords } from './types/Passwords';
import { VerifyUserDto } from './types/VerifyUserDto';
import { AuthService } from '@src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private databaseService: DatabaseService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const { email } = createUserDto;

    const newUser = await this.databaseService.user.create({
      data: { email, password: hashedPassword },
    });

    return newUser;
  }

  async createSession(userId: number, refreshToken: string, expiresAt: Date) {
    return this.databaseService.session.create({
      data: {
        user: { connect: { id: userId } },
        refreshToken,
        expiresAt,
      },
    });
  }

  async findById(id: number) {
    return this.databaseService.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async findByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: { email },
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            avatar: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async findSession(refreshToken: string) {
    return this.databaseService.session.findFirst({
      where: {
        refreshToken: { equals: refreshToken },
        expiresAt: { gt: new Date() },
      },
    });
  }

  async updateSession(
    sessionId: number,
    newRefreshToken: string,
    expiresAt: Date,
  ) {
    return this.databaseService.session.update({
      where: { id: sessionId },
      data: {
        refreshToken: newRefreshToken,
        expiresAt,
      },
    });
  }

  async updateEmail(
    userId: number,
    email: string,
  ): Promise<ClientProfile | null> {
    await this.databaseService.user.update({
      where: { id: userId },
      data: { email },
    });

    const profile = await this.databaseService.profile.findUnique({
      where: { userId },
      select: {
        id: true,
        name: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return profile;
  }

  async updatePassword(userId: number, passwords: Passwords) {
    const user = await this.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Unathorized');
    }

    const isCurrentPasswordCorrect = await bcrypt.compare(
      passwords.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordCorrect) {
      throw new BadRequestException('Your current password is wrong.');
    }

    const hashedPassword = await bcrypt.hash(passwords.newPassword, 10);

    await this.databaseService.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { success: true };
  }

  async verifyUser(verifyUserDto: VerifyUserDto) {
    const verificationCode =
      await this.databaseService.registrationVerificationCode.findFirst({
        where: { email: { equals: verifyUserDto.email } },
      });

    // 1. Not found
    if (!verificationCode) {
      throw new BadRequestException({
        code: 'VERIFICATION_CODE_NOT_FOUND',
        message: 'Verification code not found',
      });
    }

    // 2. Is expired
    if (verificationCode.expiresAt <= new Date()) {
      await this.databaseService.registrationVerificationCode.delete({
        where: { email: verifyUserDto.email },
      });
      throw new BadRequestException({
        code: 'VERIFICATION_CODE_EXPIRED',
        message: 'Verification code has expired',
      });
    }

    // 3. Invalid
    if (verificationCode.code !== verifyUserDto.code) {
      throw new BadRequestException({
        code: 'INVALID_VERIFICATION_CODE',
        message: 'Invalid verification code',
      });
    }

    const user = await this.databaseService.user.update({
      where: { email: verifyUserDto.email },
      data: { isVerified: true },
    });

    const profile = await this.databaseService.profile.findFirst({
      where: { userId: { equals: user.id } },
    });

    if (!profile) {
      throw new UnauthorizedException();
    }

    await this.databaseService.registrationVerificationCode.delete({
      where: { email: user.email },
    });

    const userWithProfile = { ...user, profile };

    return this.authService.login(userWithProfile);
  }
}
