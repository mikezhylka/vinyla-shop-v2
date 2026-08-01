import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { JwtUser } from '@src/common/decorators/jwt-user.decorator';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add-to-wishlist/:id')
  async addToWishlist(
    @JwtUser() user: JwtUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.profileService.addToWishlist(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@JwtUser() user: JwtUser) {
    return this.profileService.getMe(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('wishlist')
  async getWishlist(@JwtUser() user: JwtUser) {
    return this.profileService.getWishlist(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('wishlist-ids')
  async getWishlistIds(@JwtUser() user: JwtUser) {
    return this.profileService.getWishlistIds(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-name')
  async updateName(@JwtUser() user: JwtUser, @Body('name') name: string) {
    return this.profileService.updateName(user.userId, name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @JwtUser() user: JwtUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.updateAvatar(user, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-from-wishlist/:id')
  async removeFromWishlist(
    @JwtUser() user: JwtUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.profileService.removeFromWishlist(user, id);
  }
}
