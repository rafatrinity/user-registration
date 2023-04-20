import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({example: 'Rafael Trindade'})
  name: string;

  @IsEmail()
  @ApiProperty({type: String, format: 'email', example: 'RafaelTrindade@gmail.com'})
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;
}
