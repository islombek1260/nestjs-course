import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { LoginDto } from "../../../modules/auth/dto/login.dto";
import { UserService } from "../../../modules/user/service/user.service";
import { Response } from "express";
import { CreateUserDto } from "../dto/create.user.dto";
import { sign } from 'jsonwebtoken';
import { AuthGuard } from "../guard/auth.guard";
import { SignInGuard } from "../guard/sign-in.guard";
import { ApiCreatedResponse, ApiOperation, ApiParam } from "@nestjs/swagger";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @HttpCode(HttpStatus.OK)
    @Post('auth')
    @ApiParam({ name: 'password', description: 'Password', example: 'Jon18' })
    @ApiParam({ name: 'email', description: 'Email', example: 'Jon18@mail.com' })
    @ApiParam({ name: 'username', description: 'User name', example: 'Jon Doe' })
    @ApiOperation({ summary: 'Create a new user' })
    @ApiCreatedResponse({ description: 'The user has been successfully created', type: CreateUserDto })
    @UseGuards(AuthGuard)
    async auth(@Body() dto: CreateUserDto, @Res() res: Response) {
        try {
            const user = await this.userService.getUserByEmail(dto.email);
            const username = await this.userService.getUserByUsername(dto.username);

            if (user) {
                return res.status(HttpStatus.CONFLICT).json({ msg: 'Email alredi exist' });
            }

            if (username) {
                return res.status(HttpStatus.CONFLICT).json({ msg: 'Username alredi exist' });
            }


            const newUser = await this.userService.createUser(dto);

            const token = sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '10m' });
            
            return res.status(HttpStatus.CREATED).json({ data: newUser, token });
            
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
        }
    }

    @Post('login')
    @ApiParam({ name: 'password', description: 'Password', example: 'Jon18' })
    @ApiParam({ name: 'username', description: 'User name', example: 'Jon Doe' })
    @ApiOperation({ summary: 'Login profil' })
    @ApiCreatedResponse({ description: 'The user login successfully', type: LoginDto })
    @UseGuards(SignInGuard)
    async login(@Body() dto: LoginDto, @Res() res: Response) {
        try {
            const user = await this.userService.getUserByUsername(dto.username);

            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({ msg: 'User not found' });
            }

            const token = sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '10m' });

            res.status(HttpStatus.OK).json({ data: user, token })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
        }
    }

}