import { Module } from '@nestjs/common';
import { LinkedInService } from './linkedin.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [LinkedInService],
  exports: [LinkedInService],
})
export class LinkedInModule {}