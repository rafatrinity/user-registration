import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({example: 'Rafael'})
  first_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({example: 'Trindade'})
  last_name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({type: String, format: 'email', example: 'RafaelTrindade@gmail.com'})
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  avatar?: string;
}
