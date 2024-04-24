import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { UserController } from "../user/controller/user.controller";
import { UserService } from "../user/service/user.service";
import { FileService } from "../file-upload/service/file.service";
import { CourseFileEntity } from "../file-upload/entities/course.file.entity";
import { CourseEntity } from "./entity/course.entity";
import { CourseController } from "./controller/course.controller";
import { CourseService } from "./service/course.service";
import { AuthService } from "../auth/service/auth.service";
import { UserFileEntity } from "../file-upload/entities/user.file.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([CourseEntity, UserEntity, CourseFileEntity, UserFileEntity])
    ],
    controllers: [CourseController, UserController],
    providers: [CourseService, UserService, FileService, AuthService],
})
export class CourseModule {}