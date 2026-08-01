import { CreateUserDto, CreateUserSchema } from '@monorepo/shared-types';
import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CurrentUser } from '@src/common/decorators/current-user.decorator';
import { ZodValidationPipe } from '@src/common/decorators/zod-validation-pipe.decorator';
import { UserWithProfile } from '@src/users/types/User';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserWithProfile) {
    return this.authService.login(user);
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return await this.authService.refresh(refreshToken);
  }

  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string) {
    return this.authService.logout(refreshToken);
  }
}
