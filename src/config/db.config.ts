import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../modules/user/entities/user.entity';
import { CourseFileEntity } from '../modules/file-upload/entities/course.file.entity';
import { UserFileEntity } from '../modules/file-upload/entities/user.file.entity';
import { CourseEntity } from '../modules/course/entity/course.entity';

dotenv.config();

const dbConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserEntity, CourseFileEntity, UserFileEntity, CourseEntity],
  synchronize: true,
};

export default dbConfig;