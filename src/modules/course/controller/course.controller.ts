import { Controller, Post, Headers, Res, HttpStatus, UseGuards, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { CreateCourseDto } from '../dto/create.course.dto';
import { CourseService } from '../service/course.service';
import { TokenGuard } from '../../file-upload/guard/token.guard';
import { AuthService } from '../../auth/service/auth.service';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CourseDto } from '../dto/course.dto';
import { UpdateCourseDto } from '../dto/update.course.dto';



@Controller()
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly authService: AuthService,
  ) { }

  @Get('my_courses')
  @ApiOperation({ summary: 'Get all my courses' })
  @ApiOkResponse({ description: 'Courses found', type: CourseDto, isArray: true })
  @UseGuards(TokenGuard)
  async getMyCourses(@Headers('authorization') authorization: string, @Res() res: Response) {
    try {
      const userId = await this.authService.verifyToken(authorization);

      const courses = await this.courseService.getMyCourses(userId)

      res.status(HttpStatus.OK).json({ data: courses });
    } catch (error) {
      console.log(error.message);
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad request' });
    }
  }

  @Get('courses')
  @ApiOperation({ summary: 'Get all courses' })
  @ApiOkResponse({ description: 'Courses found', type: CourseDto, isArray: true })
  async getAllCourses(@Res() res: Response) {
    try {
      const courses = await this.courseService.getAllCourses();
      return res.status(HttpStatus.OK).json({ courses });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
  }

  @Get('course:id')
  @ApiOperation({ summary: 'Get course by ID' })
  @ApiParam({ name: 'id', description: 'Course ID', example: '1' })
  @ApiOkResponse({ description: 'Course found', type: CourseDto })
  @ApiNotFoundResponse({ description: 'Course not found' })
  async getCourseById(@Body() title: string, @Res() res: Response) {
    try {
      const course = await this.courseService.getCourseByTitle(title);
      if (!course) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: 'Course not found' });
      }
      return res.status(HttpStatus.OK).json({ course });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
  }

  @Post('course')
  @ApiOperation({ summary: 'Create a new course' })
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateCourseDto })
  @ApiCreatedResponse({ description: 'The course has been successfully created', type: CourseDto })
  async createCourse(
    @Headers('authorization') authorization: string,
    @Body() courseDto: CreateCourseDto,
    @Res() res: Response,
  ) {
    try {
      const userId = await this.authService.verifyToken(authorization);
      const course = await this.courseService.createCourse(courseDto, userId);
      return res.status(HttpStatus.CREATED).json({ course });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad request' });
    }
  }

  @Put('course:id')
  @ApiOperation({ summary: 'Update course by ID' })
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Course ID', example: '1' })
  @ApiBody({ type: UpdateCourseDto })
  @ApiOkResponse({ description: 'Course updated', type: CourseDto })
  @ApiNotFoundResponse({ description: 'Course not found' })
  async updateCourse(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Res() res: Response,
  ) {
    try {
      const userId = await this.authService.verifyToken(authorization);
      const course = await this.courseService.updateCourse(id, updateCourseDto, userId);
      if (!course) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: 'Course not found' });
      }
      return res.status(HttpStatus.OK).json({ course });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad request' });
    }
  }

  @Delete('course:id')
  @ApiOperation({ summary: 'Delete course by ID' })
  @UseGuards(TokenGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Course ID', example: '1' })
  @ApiOkResponse({ description: 'Course deleted' })
  @ApiNotFoundResponse({ description: 'Course not found' })
  async deleteCourse(
    @Headers('authorization') authorization: string,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const userId = await this.authService.verifyToken(authorization);
      const deleted = await this.courseService.deleteCourse(id, userId);
      if (!deleted) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: 'Course not found' });
      }
      return res.status(HttpStatus.OK).json({ message: 'Course deleted' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad request' });
    }
  }
}
