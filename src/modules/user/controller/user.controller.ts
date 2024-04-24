import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Headers, Res, UseGuards, Put, Body, Query } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { Response } from "express";
import { TokenGuard } from "../../file-upload/guard/token.guard";
import { AuthService } from "../../auth/service/auth.service";
import { UpdateUserDto } from "../dto/update.user.dto";
import { UserQueryDto } from "../dto/user.query.dto";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @HttpCode(HttpStatus.OK)
  @Get('users')
  async getUsers(@Query() query: UserQueryDto, @Res() res: Response) {
    try {
      const users = await this.userService.getUsers(query);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to get users' });
    }
  }


  @Get('user')
  @UseGuards(TokenGuard)
  async getUserByToken(@Headers('authorization') authorization: string, @Res() res: Response) {
    try {
      const userId = await this.authService.verifyToken(authorization);

      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
      }

      return res.status(HttpStatus.OK).json({ data: user });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
    }
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: number, @Res() res: Response) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
    }
    return res.status(HttpStatus.OK).json({ data: user });
  }

  @Get('username/:username')
  async getUserByUsername(@Param('username') username: string, @Res() res: Response) {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
    }
    return res.status(HttpStatus.OK).json({ data: user });
  }

  @Put("update")
  @UseGuards(TokenGuard)
  async updateUser(@Headers('authorization') authorization: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const userId = await this.authService.verifyToken(authorization);
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
    }

    const updatedUser = await this.userService.updateUser(userId, updateUserDto);
    return res.status(HttpStatus.CREATED).json({ data: updatedUser })
  }

  @Delete('delete')
  @UseGuards(TokenGuard)
  async deleteUser(@Headers('authorization') authorization: string, @Res() res: Response) {
    const userId = await this.authService.verifyToken(authorization);
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
    }
    const deltedUser = await this.userService.deleteUser(userId);
    return res.status(HttpStatus.OK).json({ data: deltedUser });
  }

}