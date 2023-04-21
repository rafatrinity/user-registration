import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({example: 'Rafael'})
  first_name: string;

  @IsString()
  @ApiProperty({example: 'Trindade'})
  last_name: string;

  @IsEmail()
  @ApiProperty({type: String, format: 'email', example: 'RafaelTrindade@gmail.com'})
  email: string;

  @IsString()
  @ApiProperty()
  avatar: string;
}
