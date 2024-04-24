import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { CreateUserDto } from "../../auth/dto/create.user.dto";
import { ILike, IsNull, Not, Repository } from "typeorm";
import { UpdateUserDto } from "../dto/update.user.dto";
import { UserQueryDto } from "../dto/user.query.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }


    async getUsers(query: UserQueryDto): Promise<UserEntity[]> {
        const { page, limit } = query;
    
        const defaultLimit = 10;
        const defaultPage = 1;
    
        const skip = (page - 1) * limit || (defaultPage - 1) * defaultLimit;
        const take = limit || defaultLimit;
    
        const users = await this.userRepository.find({
          skip,
          take,
        });
    
        return users;
      }

    async getUserById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } });
        return user;
    }

    async getUserByUsername(username: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { username } });
        return user
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user
    }

    async deleteUser(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } });
        const deletedUser = await this.userRepository.remove(user);
        return deletedUser
    }

    async createUser(dto: CreateUserDto): Promise<UserEntity> {
        const NewUser = await this.userRepository.save(dto)
        return NewUser;
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.getUserById(id);

        if (updateUserDto.username) {
            user.username = updateUserDto.username;
        }

        if (updateUserDto.email) {
            user.email = updateUserDto.email;
        }

        if (updateUserDto.password) {
            user.password = updateUserDto.password;
        }

        const updatedUser = await this.userRepository.save(user);
        return updatedUser;
    }
}