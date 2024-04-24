import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  username?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'John18@mail.com', description: 'Email' })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(4, 20)
  @ApiProperty({ example: 'John18', description: 'Password' })
  password?: string;

}