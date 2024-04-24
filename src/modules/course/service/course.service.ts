import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from '../dto/create.course.dto';
import { CourseEntity } from '../entity/course.entity';
import { UserService } from '../../user/service/user.service';
import { title } from 'process';
import { UpdateCourseDto } from '../dto/update.course.dto';
import { CourseDto } from '../dto/course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    private userService: UserService
  ) { }

  async getAllCourses(): Promise<CourseEntity[]> {
    try {
        const orders =await this.courseRepository.find()
        return orders
    } catch (error) {
      throw new Error('internal error: ' + error);
    }
  }


  async getMyCourses(userId: number): Promise<CourseEntity[]> {
    try {
        const user = await this.userService.getUserById(userId)

        const orders =await this.courseRepository.find({where: {user: user}})
      
        return orders
    } catch (error) {
      throw new Error('internal error: ' + error);
    }
  }

  async getCourseById(id: string): Promise<CourseEntity> {
    try {
      const courseId: number = parseInt(id, 10);
      if (isNaN(courseId)) {
        throw new BadRequestException('Invalid course ID');
      }
        const course = await this.courseRepository.findOne({ where: { id: courseId } })
        return course
    } catch (error) {
      throw new Error('internal error: ' + error);
    }
  }

  async getCourseByTitle(title: string): Promise<CourseEntity> {
    try {
        const course = await this.courseRepository.findOne({ where: { title } })
        return course
    } catch (error) {
      throw new Error('internal error: ' + error);
    }
  }

  async createCourse(courseDto: CreateCourseDto, userId: number): Promise<CourseEntity> {
    try {
      const { title, description } = courseDto;
      const user = await this.userService.getUserById(userId);

      const newCourse = new CourseEntity();
      newCourse.title = title;
      newCourse.description = description;
      newCourse.user = user;

      const savedCourse = await this.courseRepository.save(newCourse);

      return savedCourse;
    } catch (error) {
      console.log(error);
      
      throw new Error('Failed to create order');
    }
  }

  async updateCourse(id: string, updateCourseDto: UpdateCourseDto, userId: number): Promise<CourseDto | null> {
    const course = await this.getCourseById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }
    
    if (course.user.id !== userId) {
      throw new UnauthorizedException('You are not authorized to update this course');
    }

  if (!course) {
    throw new NotFoundException('Course not found');
  }

  if (updateCourseDto.title) {
    course.title = updateCourseDto.title;
  }

  if (updateCourseDto.description) {
    course.description = updateCourseDto.description;
  }

  const updatedCourse = await this.courseRepository.save(course);
  return updatedCourse;
  }

  async deleteCourse(id: string, userId: number): Promise<boolean> {
    const course = await this.getCourseById(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
  
    if (course.user.id !== userId) {
      throw new UnauthorizedException('You are not authorized to update this course');
    }
  
    await this.courseRepository.remove(course);
    return true;
  }
}