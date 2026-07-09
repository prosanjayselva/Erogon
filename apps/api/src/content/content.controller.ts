import { Controller, Get } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('site')
  getSiteContent() {
    return this.contentService.getSiteContent();
  }
}

