import { ClientProfile, CreateUserDto } from '@monorepo/shared-types';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaTransaction } from '@src/common/types/prisma-transaction.type';
import { DatabaseService } from '@src/database/database.service';
import * as bcrypt from 'bcryptjs';
import { Passwords } from './types/Passwords';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto, tx?: PrismaTransaction) {
    const db = tx ?? this.databaseService;
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
    return this.databaseService.session.findUnique({
      where: { refreshToken, expiresAt: { gt: new Date() } },
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
}
