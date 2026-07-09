import { Injectable } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { VolunteerInterestDto } from './dto/volunteer-interest.dto';

@Injectable()
export class FormsService {
  submitContact(payload: ContactDto) {
    return {
      success: true,
      message: `Thanks ${payload.name}. Your message has been received and the ERGON Foundation team will respond soon.`,
    };
  }

  submitInterest(payload: VolunteerInterestDto) {
    return {
      success: true,
      message: `Thanks ${payload.name}. We have recorded your interest in ${payload.interestArea.toLowerCase()} and will reach out shortly.`,
    };
  }
}

