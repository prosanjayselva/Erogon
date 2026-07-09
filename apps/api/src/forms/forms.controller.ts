import { Body, Controller, Post } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { VolunteerInterestDto } from './dto/volunteer-interest.dto';
import { FormsService } from './forms.service';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('contact')
  submitContact(@Body() payload: ContactDto) {
    return this.formsService.submitContact(payload);
  }

  @Post('interest')
  submitInterest(@Body() payload: VolunteerInterestDto) {
    return this.formsService.submitInterest(payload);
  }
}

