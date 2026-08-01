import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { JwtUser } from '@src/common/decorators/jwt-user.decorator';
import { Passwords } from './types/Passwords';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('update-email')
  async updateEmail(@JwtUser() user: JwtUser, @Body('email') email: string) {
    return await this.usersService.updateEmail(user.userId, email);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-password')
  async updatePassword(@JwtUser() user: JwtUser, @Body() passwords: Passwords) {
    return await this.usersService.updatePassword(user.userId, passwords);
  }
}
