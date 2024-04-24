import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CourseDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'English Language', description: 'title' })
    title: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'For beginners', description: 'description' })
    description: string
}