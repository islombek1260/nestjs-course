import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseFileEntity } from './entities/course.file.entity';
import { FileService } from './service/file.service';
import { FileController } from './controller/file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from '../auth/service/auth.service';
import { UserService } from '../user/service/user.service';
import { CourseEntity } from '../course/entity/course.entity';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserFileEntity } from './entities/user.file.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads')
    }),
    TypeOrmModule.forFeature([CourseFileEntity, UserFileEntity, UserEntity, CourseEntity],),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtension = extname(file.originalname).toLowerCase();
          callback(null, `${uniqueSuffix}${fileExtension}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.docx', '.pdf'];
        const fileExtension = path.extname(file.originalname).toLowerCase();
        
        if (!allowedExtensions.includes(fileExtension)) {
          callback(new Error('Invalid file format. Only JPG, JPEG, PNG, DOCX, and PDF files are allowed.'), false);
        } else {
          callback(null, true);
        }
      },
    })
  ], 
  controllers: [FileController],
  providers: [FileService, AuthService, UserService]
})
export class FileUploadModule {}