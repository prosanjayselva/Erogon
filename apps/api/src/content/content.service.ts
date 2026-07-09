import { Injectable } from '@nestjs/common';
import { siteContent } from './site-content';

@Injectable()
export class ContentService {
  getSiteContent() {
    return siteContent;
  }
}

