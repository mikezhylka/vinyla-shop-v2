import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '@src/auth/auth.service';
import { Strategy } from 'passport-local';
import z from 'zod';

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  // validate is a must-have name for this method
  async validate(username: unknown, password: unknown): Promise<any> {
    const result = LoginSchema.safeParse({ email: username, password });

    if (!result.success) {
      throw new UnauthorizedException('Invalid input types');
    }

    const user = await this.authService.validateUser(
      result.data.email,
      result.data.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
