import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { beforeEach, describe, it } from 'node:test';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return the login DTO', async () => {
      const loginDto: LoginDto = {username: 'user1', password: 'pass1' };

      const result = await authService.login(loginDto);

      expect(result).toEqual(loginDto);
    });
  });
});

function expect(result: LoginDto) {
  throw new Error('Function not implemented.');
}
