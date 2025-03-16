import {
  IsEmail,
  IsString,
  IsOptional,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 50)
  first_name: string;

  @IsString()
  @Length(4, 50)
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8, 50)
  @IsNotEmpty()
  password: string;

  @IsOptional()
  avatar: string;
}
