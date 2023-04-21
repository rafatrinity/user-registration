import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto } from '../src/user/dto/createUser.dto';
import { UpdateUserDto } from '../src/user/dto/updateUser.dto';
import { UserController } from '../src/user/user.controller';
import { User } from '../src/user/user.schema';
import { UserService } from '../src/user/user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = {
    create: jest.fn((dto: CreateUserDto) => {
      return Promise.resolve({
        id: '1',
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        avatar: dto.avatar,
      } as User);
    }),
    update: jest.fn((id: string, dto: UpdateUserDto) => {
      return Promise.resolve({
        id,
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email,
        avatar: dto.avatar,
      } as User);
    }),
    remove: jest.fn((id: string) => Promise.resolve()),
    findOne: jest.fn((id: string) => {
      return Promise.resolve({
        id,
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        avatar: 'https://hello.png',
      } as User);
    }),
    findAll: jest.fn((page, limit) => {
      return Promise.resolve([
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@example.com',
          avatar: 'https://hello.png',
        },
        {
          id: '2',
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@example.com',
          avatar: 'https://hello.png',
        },
      ] as User[]);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        first_name: 'John',
        last_name:'Doe',
        email: 'johndoe@example.com',
        avatar: 'https://hello.png',
      };

      const result = await controller.create(createUserDto);

      expect(userService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual({
        id: '1',
        first_name: 'John',
        last_name:'Doe',
        email: 'johndoe@example.com',
        avatar: 'https://hello.png',
      } as User);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = '1';
      const updateUserDto: UpdateUserDto = {
        email: 'johndoe@example.com',
        avatar: 'https://hello.png',
      };

      const result = await controller.update(id, updateUserDto);

      expect(userService.update).toHaveBeenCalledWith(id, updateUserDto);
      expect(result).toEqual({
        id: '1',
        first_name: 'John',
        last_name:'Doe',
        email: 'johndoe@example.com',
        avatar: 'https://hello.png',
      } as User);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const id = '1';

      await controller.remove(id);

      expect(userService.remove).toHaveBeenCalledWith(id);
    });
  });
});
