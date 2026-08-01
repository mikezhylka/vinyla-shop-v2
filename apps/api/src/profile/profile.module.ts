import { Module } from '@nestjs/common';
import { CloudinaryService } from '@src/cloudinary/cloudinary.service';
import { DatabaseService } from '@src/database/database.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileService, DatabaseService, CloudinaryService],
  controllers: [ProfileController],
})
export class ProfileModule {}
