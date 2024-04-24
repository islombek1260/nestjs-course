import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, Length, isString } from "class-validator"
import { QueryDto } from "../../../utils/dto/query.dto"

export class UserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'John Doe', description: 'Login' })
    username: string

    @IsNotEmpty()
    @IsString()
    @Length(4, 20)
    @ApiProperty({ example: 'John18', description: 'Password' })
    password: string
}