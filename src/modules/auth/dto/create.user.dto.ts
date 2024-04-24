import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'John Doe', description: 'User name' })
    username: string

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'John18@mail.com', description: 'Email' })
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(4, 20)
    @ApiProperty({ example: 'John18', description: 'Password' })
    password: string

}