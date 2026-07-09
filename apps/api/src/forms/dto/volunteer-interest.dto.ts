import { IsEmail, IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';

const interestAreas = ['Volunteer', 'Partner', 'Career'] as const;

export class VolunteerInterestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(24)
  phone!: string;

  @IsIn(interestAreas)
  interestArea!: (typeof interestAreas)[number];

  @IsString()
  @IsNotEmpty()
  @MaxLength(600)
  note!: string;
}
