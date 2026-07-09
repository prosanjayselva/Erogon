import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ContactDto {
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

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  subject!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1200)
  message!: string;
}

