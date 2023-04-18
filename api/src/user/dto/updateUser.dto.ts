import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password?: string;
}
