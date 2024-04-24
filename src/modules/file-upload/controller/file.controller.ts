import { Controller, Post, Res, UploadedFile, UseInterceptors, Headers, HttpStatus, HttpCode, Get, UseGuards, Param, UploadedFiles, Put } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { FileService } from "../service/file.service";
import { UserService } from "../../user/service/user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { TokenGuard } from "../guard/token.guard";
import { AuthService } from "../../auth/service/auth.service";

@Controller()
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('upload-user-file')
  @UseGuards(TokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserFile(@Headers('authorization') authorization: string, @Param() title: string, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    try {
      const userId = await this.authService.verifyToken(authorization);
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({ msg: 'Not found' });
      }
      if (!file) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: 'No files provided' });
      }

      const uploadedFiles = await this.fileService.uploadDocument(file, userId, title);

      return res.status(HttpStatus.CREATED).json({ data: uploadedFiles });
    } catch (error) {
      console.log(error.message);

      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad request' });
    }
  }

  @Post('upload-user-files')
  @UseGuards(TokenGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'file', maxCount: 5 },
  ]))
  async uploadUserFiles(
    @Headers('authorization') authorization: string,
    @Param() ordername: string,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
    @Res() res: Response
  ) {
    try {
      const userId = await this.authService.verifyToken(authorization);
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({ msg: 'Not found' });
      }

      const uploadedFiles = await this.fileService.uploadDocuments(files.file, userId, ordername);

      return res.status(HttpStatus.CREATED).json({ data: uploadedFiles });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad request' });
    }
  }

/////////////////////////

  @Post('upload-course-file')
  @UseGuards(TokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadCourseFile(@Headers('authorization') authorization: string, @Param() title: string, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    try {
      const userId = await this.authService.verifyToken(authorization);
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({ msg: 'Not found' });
      }
      if (!file) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: 'No files provided' });
      }

      const uploadedFiles = await this.fileService.uploadDocument(file, userId, title);

      return res.status(HttpStatus.CREATED).json({ data: uploadedFiles });
    } catch (error) {
      console.log(error.message);

      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad request' });
    }
  }

  @Post('upload-course-files')
  @UseGuards(TokenGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'file', maxCount: 5 },
  ]))
  async uploadCourseFiles(
    @Headers('authorization') authorization: string,
    @Param() ordername: string,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
    @Res() res: Response
  ) {
    try {
      const userId = await this.authService.verifyToken(authorization);
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({ msg: 'Not found' });
      }

      const uploadedFiles = await this.fileService.uploadDocuments(files.file, userId, ordername);

      return res.status(HttpStatus.CREATED).json({ data: uploadedFiles });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad request' });
    }
  }

} 