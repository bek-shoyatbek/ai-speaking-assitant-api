import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { faker } from '@faker-js/faker';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, PrismaService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should be signup', async () => {
      const signupSpy = jest.spyOn(service, 'signup');

      const mockUser = {
        name: faker.person.firstName(),
        email: `${faker.person.firstName()}@gmail.com`,
        password: '12345',
      };

      const accessToken = await controller.signup(mockUser);

      expect(signupSpy).toHaveBeenCalledTimes(1);
      expect(typeof accessToken).toBe('object');
      expect(accessToken).toHaveProperty('access_token');
    });
  });
});
