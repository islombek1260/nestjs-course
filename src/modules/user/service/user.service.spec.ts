import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../auth/dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const users = [new UserEntity(), new UserEntity()];
      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      const result = await service.getUsers();

      expect(result).toEqual(users);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const user = new UserEntity();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await service.getUserById(1);

      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('getUserByUsername', () => {
    it('should return a user by username', async () => {
      const user = new UserEntity();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await service.getUserByUsername('username');

      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { username: 'username' } });
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user by email', async () => {
      const user = new UserEntity();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await service.getUserByEmail('email@example.com');

      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: 'email@example.com' } });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      const user = new UserEntity();
      jest.spyOn(service, 'getUserById').mockResolvedValue(user);
      jest.spyOn(userRepository, 'remove').mockResolvedValue(user);

      const result = await service.deleteUser(1);

      expect(result).toEqual(user);
      expect(service.getUserById).toHaveBeenCalledWith(1);
      expect(userRepository.remove).toHaveBeenCalledWith(user);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
          username: '',
          fullname: '',
          email: '',
          phone: '',
          password: '',
          selectedRole: false
      };
      const newUser = new UserEntity();
      jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

      const result = await service.createUser(createUserDto);

      expect(result).toEqual(newUser);
      expect(userRepository.save).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('updateUser', () => {
    it('should update a user by ID', async () => {
      const user = new UserEntity();
      user.username = 'oldUsername';
      jest.spyOn(service, 'getUserById').mockResolvedValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const updateUserDto: UpdateUserDto = {
          username: 'newUsername',
          fullname: '',
          email: '',
          phone: '',
          password: '',
          selectedRole: false
      };

      const result = await service.updateUser(1, updateUserDto);

      expect(result).toEqual(user);
      expect(service.getUserById).toHaveBeenCalledWith(1);
      expect(userRepository.save).toHaveBeenCalledWith({
        ...user,
        username: 'newUsername',
      });
    });
  });
});