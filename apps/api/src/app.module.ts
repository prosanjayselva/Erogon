import { Module } from '@nestjs/common';
import { ContentModule } from './content/content.module';
import { FormsModule } from './forms/forms.module';

@Module({
  imports: [ContentModule, FormsModule],
})
export class AppModule {}

