import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // describe('/users (GET)', () => {
  //   it('should get all users', () => {
  //     return request(app.getHttpServer())
  //       .get('/users')
  //       .expect(200)
  //       .expect((response) => {
  //         expect(response.body.data).toBeDefined();
  //         expect(response.body.data).toBeInstanceOf(Array);
  //       });
  //   });
  // });

  // describe('/user (GET)', () => {
  //   it('should get user by token', () => {
  //     const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwNDg4NDExMiwiZXhwIjoxNzA0OTcwNTEyfQ.i0tCRSd1nZzWqJYA3hma1FrAL0obnfLvBnOzhPvWPwY';

  //     return request(app.getHttpServer())
  //       .get('/user')
  //       .set('Authorization', token)
  //       .expect(200)
  //       .expect((response) => {
  //         expect(response.body.data).toBeDefined();
  //         expect(response.body.data).toHaveProperty('id');
  //         expect(response.body.data).toHaveProperty('username');
  //         // Add more assertions as needed
  //       });
  //   });

  //   it('should return 401 if token is invalid', () => {
  //     const invalidToken = 'invalid-test-token';

  //     return request(app.getHttpServer())
  //       .get('/user')
  //       .set('Authorization', invalidToken)
  //       .expect(403)
  //       .expect((response) => {
  //         expect(response.body.message).toBe('Forbidden resource');
  //       });
  //   });
  // });

  // describe('/user/:id (GET)', () => {
  //   it('should get user by ID', () => {
  //     const userId = 1;

  //     return request(app.getHttpServer())
  //       .get(`/user/${userId}`)
  //       .expect(200)
  //       .expect((response) => {
  //         expect(response.body.data).toBeDefined();
  //         expect(response.body.data).toHaveProperty('id', userId);
  //         expect(response.body.data).toHaveProperty('username');
  //         // Add more assertions as needed
  //       });
  //   });

  //   it('should return 404 if user with the given ID does not exist', () => {
  //     const nonExistingUserId = 9999;

  //     return request(app.getHttpServer())
  //       .get(`/user/${nonExistingUserId}`)
  //       .expect(404)
  //       .expect((response) => {
  //         expect(response.body.message).toBe('User not found');
  //       });
  //   });
  // });

  // describe('/username/:username (GET)', () => {
  //   it('should get user by username', () => {
  //     const username = 'test';

  //     return request(app.getHttpServer())
  //       .get(`/username/${username}`)
  //       .expect(200)
  //       .expect((response) => {
  //         expect(response.body.data).toBeDefined();
  //         expect(response.body.data).toHaveProperty('id');
  //         expect(response.body.data).toHaveProperty('username', username);
  //         // Add more assertions as needed
  //       });
  //   });

  //   it('should return 404 if user with the given username does not exist', () => {
  //     const nonExistingUsername = 'nonexistinguser';

  //     return request(app.getHttpServer())
  //       .get(`/username/${nonExistingUsername}`)
  //       .expect(404)
  //       .expect((response) => {
  //         expect(response.body.message).toBe('User not found');
  //       });
  //   });
  // });

  // describe('/update/:id (PUT)', () => {
  //   it('should update user by ID', () => {
  //     const userId = 1;
  //     const updateUserDto = {
  //       // Provide the necessary properties for updateUserDto
  //     };

  //     return request(app.getHttpServer())
  //       .put(`/update/${userId}`)
  //       .send(updateUserDto)
  //       .expect(201)
  //       .expect((response) => {
  //         expect(response.body.data).toBeDefined();
  //         expect(response.body.data).toHaveProperty('id', userId);
  //         // Add more assertions as needed
  //       });
  //   });

  //   it('should return 404 if user with the given ID does not exist', () => {
  //     const nonExistingUserId = 9999;
  //     const updateUserDto = {
  //       // Provide the necessary properties for updateUserDto
  //     };

  //     return request(app.getHttpServer())
  //       .put(`/update/${nonExistingUserId}`)
  //       .send(updateUserDto)
  //       .expect(404)
  //       .expect((response) => {
  //         expect(response.body.message).toBe('User not found');
  //       });
  //   });
  // });

  describe('/delete/:id (DELETE)', () => {

    it('should delete user by ID', () => {
      const userId = 1;

      return request(app.getHttpServer())
        .delete(`/delete/${userId}`)
        .expect(200)
        .expect((response) => {
          expect(response.body.data).toBeDefined();
          // Add more assertions as needed
        });
    });

    it('should return 404 if user with the given ID does not exist', () => {
      const nonExistingUserId = 9999;

      return request(app.getHttpServer())
        .delete(`/delete/${nonExistingUserId}`)
        .expect(404)
        .expect((response) => {
          expect(response.body.message).toBe('User not found');
        });
    });
  });
});