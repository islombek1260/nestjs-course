import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { AuthService } from "../auth/service/auth.service";
import { FileService } from "../file-upload/service/file.service";
import { CourseFileEntity } from "../file-upload/entities/course.file.entity";
import { CourseEntity } from "../course/entity/course.entity";
import { UserFileEntity } from "../file-upload/entities/user.file.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, CourseFileEntity, UserFileEntity, CourseEntity]),
    ],
    controllers: [UserController],
    providers: [UserService, AuthService, FileService],
})
export class UserModule {}