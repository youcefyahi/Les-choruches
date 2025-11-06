import { Module } from '@nestjs/common';
import { PhotoSuggestionsController } from './photo-suggestions.controller';
import { PhotoSuggestionsService } from './photo-suggestions.service';

@Module({
  controllers: [PhotoSuggestionsController],
  providers: [PhotoSuggestionsService],
  exports: [PhotoSuggestionsService],
})
export class PhotoSuggestionsModule {}