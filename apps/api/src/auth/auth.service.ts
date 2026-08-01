import { User } from '@generated/prisma/client';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '@src/database/database.service';
import { UsersService } from '@src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@monorepo/shared-types';
import { ProfileService } from '@src/profile/profile.service';
import { JwtPayload } from './types/JwtPayload';
import { UserWithProfile } from '@src/users/types/User';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private databaseService: DatabaseService,
    private profileService: ProfileService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const isPasswordEqual = await bcrypt.compare(pass, user.password);

      if (isPasswordEqual) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;

        return result;
      }
    }

    return null;
  }

  async register(createUserDto: CreateUserDto) {
    const { email, name } = createUserDto;

    const isEmailUsed = await this.usersService.findByEmail(email);

    if (isEmailUsed)
      throw new BadRequestException('This email is already used.');

    const user = await this.databaseService.$transaction(async (tx) => {
      const newUser = await this.usersService.create(createUserDto, tx);

      const profile = await this.profileService.create(
        { name: name, userId: newUser.id },
        tx,
      );

      const userWithProfile = { ...newUser, profile };

      return userWithProfile;
    });

    return this.login(user);
  }

  async login(user: UserWithProfile) {
    const { accessToken, refreshToken, accessExpiresAt, refreshExpiresAt } =
      await this.generateTokens(user.id, user.email, user.profile.id);

    await this.usersService.createSession(
      user.id,
      refreshToken,
      refreshExpiresAt,
    );

    return {
      profile: {
        ...user.profile,
        user: { email: user.email },
      },
      access: {
        token: accessToken,
        expiresAt: accessExpiresAt,
      },
      refresh: {
        token: refreshToken,
        expiresAt: refreshExpiresAt,
      },
    };
  }

  async refresh(oldRefreshToken: string) {
    const session = await this.usersService.findSession(oldRefreshToken);

    if (!session) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.usersService.findById(session.userId);

    if (!user) throw new UnauthorizedException('User not found.');

    if (!user.profile) throw new UnauthorizedException('Profile not found.');

    const { id, email, profile } = user;

    const { accessToken, refreshToken, accessExpiresAt, refreshExpiresAt } =
      await this.generateTokens(id, email, profile.id);

    await this.usersService.updateSession(
      session.id,
      refreshToken,
      refreshExpiresAt,
    );

    return {
      access: {
        token: accessToken,
        expiresAt: accessExpiresAt,
      },
      refresh: {
        token: refreshToken,
        expiresAt: refreshExpiresAt,
      },
    };
  }

  async generateTokens(userId: number, email: string, profileId: number) {
    const payload = { sub: userId, username: email, profileId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
      }),
    ]);

    const { exp: accessExp } = this.jwtService.decode<JwtPayload>(accessToken);
    const { exp: refreshExp } =
      this.jwtService.decode<JwtPayload>(refreshToken);

    return {
      accessToken,
      refreshToken,
      // exp in JWT — is unix timestamp in sec, Date takes msec
      accessExpiresAt: new Date(accessExp * 1000),
      refreshExpiresAt: new Date(refreshExp * 1000),
    };
  }

  async logout(refreshToken: string) {
    await this.databaseService.session.deleteMany({
      where: { refreshToken },
    });

    return { success: true };
  }
}
