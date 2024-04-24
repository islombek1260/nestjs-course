import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'John Doe', description: 'User name' })
    username: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'John18', description: 'Password' })
    password: string
}