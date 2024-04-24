import { Injectable, BadRequestException, InternalServerErrorException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseFileEntity } from '../entities/course.file.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { CourseEntity } from '../../course/entity/course.entity';
import { UserFileEntity } from '../entities/user.file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(CourseFileEntity)
    private readonly courseFileRepository: Repository<CourseFileEntity>,
    @InjectRepository(UserFileEntity)
    private readonly userFileRepository: Repository<UserFileEntity>
  ) { }

  async getUserFiles(): Promise<UserFileEntity[]> {
    const files = await this.userFileRepository.find();
    return files;
  }

  async getUserFileById(id: number): Promise<UserFileEntity> {
    const userFile = await this.userFileRepository.findOne({ where: { id } });
    return userFile;
  }

  async getUserPath(id: number): Promise<string> {
    const userFile = await this.userFileRepository.findOne({ where: { id } });
    const userFilePath = userFile.filePath;
    return userFilePath;
  }

  async updateUserFile(updateUserFile: Express.Multer.File, userId: number,): Promise<UserFileEntity> {
    const { mimetype} = updateUserFile
    const { originalname, size, path } = updateUserFile;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    const updatedUserFile = new UserFileEntity();
    updatedUserFile.originalname = originalname;
    updatedUserFile.mimetype = mimetype;
    updatedUserFile.size = size;
    updatedUserFile.user = user;
    updatedUserFile.filePath = path;

    try {
      await this.userFileRepository.save(updatedUserFile);
    } catch (error) {
      throw new InternalServerErrorException('Failed to save avatar');
    }
    return updatedUserFile;
  }

  async deleteUserFile(id: number): Promise<UserFileEntity> {
    const userFile = await this.getUserFileById(id);
 
    const deletedUserFile = await this.userFileRepository.remove(userFile);
    return deletedUserFile;
  }

  async uploadUserFile(userFile: Express.Multer.File, userId: number): Promise<UserFileEntity> {
    const { mimetype} = userFile
    const { originalname, size, path } = userFile;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    const newUserFile = new UserFileEntity();
    newUserFile.originalname = originalname;
    newUserFile.mimetype = mimetype;
    newUserFile.size = size;
    newUserFile.user = user;
    newUserFile.filePath = path;

    try {
      await this.userFileRepository.save(newUserFile);
    } catch (error) {
      throw new InternalServerErrorException('Failed to save');
    }
    return newUserFile;
  }

  // New method for uploading DOC and PDF files
  async uploadDocument(file: Express.Multer.File, userId: number, title: string): Promise<CourseFileEntity> {
    
    const { originalname, mimetype, size, path } = file;
  
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const course = await this.courseRepository.findOne({ where: { title: title } });
    
    const newDocument = new CourseFileEntity();
    newDocument.originalname = originalname;
    newDocument.mimetype = mimetype;
    newDocument.size = size;
    newDocument.course = course;
    newDocument.filePath = path;
  
    try {
      return await this.courseFileRepository.save(newDocument);
    } catch (error) {
      throw new InternalServerErrorException('Failed to save document');
    }
  }

  async uploadDocuments(files: Express.Multer.File[], userId: number, ordername: string): Promise<CourseFileEntity[]> {
    const uploadedFiles: CourseFileEntity[] = [];
  
    for (const file of files) {
      const uploadedFile = await this.uploadDocument(file, userId, ordername);
      uploadedFiles.push(uploadedFile);
    }
  
    return uploadedFiles;
  }
}