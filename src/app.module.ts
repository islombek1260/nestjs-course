import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import dbConfig from './config/db.config';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CourseModule } from './modules/course/course.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    AuthModule,
    UserModule,
    CourseModule,
    FileUploadModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
