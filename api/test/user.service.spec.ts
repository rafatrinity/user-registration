import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

import { emailQueueName } from '../mocks/config.mock';
import { userObject } from '../mocks/user.mock';
import { userModelMock } from '../mocks/user.model.mock';
import { UserService } from '../src/user/user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: userModelMock,
        },
        {
          provide: ConfigService,
          useValue: {
            get: () => emailQueueName,
          },
        },
      ],
    }).compile();
    service = moduleRef.get(UserService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a new user and emit an email event', async () => {
      const createdUser = {
        id: '123',
        ...userObject,
        avatar: null,
      };
      userModelMock.create.mockResolvedValue(createdUser);

      const result = await service.create(userObject);

      expect(result).toEqual(createdUser);
      expect(userModelMock.create).toHaveBeenCalledWith(userObject);
      expect(service.client.emit).toHaveBeenCalledWith(emailQueueName, {
        message: 'success',
        email: userObject.email,
      });
    });

    it('should throw an InternalServerErrorException if an error occurs', async () => {
      const errorMessage = 'Something went wrong';
      userModelMock.create.mockRejectedValue(new Error(errorMessage));

      await expect(service.create(userObject)).rejects.toThrowError(
        new InternalServerErrorException(`error:${errorMessage}`),
      );
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const users = [
        {
          _id: '123',
          ...userObject,
          avatar: null,
        },
        {
          _id: '456',
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane.doe@example.com',
          avatar: null,
        },
      ];
      userModelMock.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(users),
      });

      const result = await service.findAll();

      expect(result).toEqual([
        {
          id: '123',
          ...userObject,
          avatar: null,
        },
        {
          id: '456',
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane.doe@example.com',
          avatar: null,
        },
      ]);
      expect(userModelMock.find).toHaveBeenCalled();
    });

    it('should throw a BadRequestException if page or limit are not positive', async () => {
      await expect(service.findAll(0, 10)).rejects.toThrowError(
        new BadRequestException('page and limit must be positive.'),
      );
    }),
    
      it('should throw an InternalServerErrorException if an error occurs', async () => {
        const errorMessage = 'Something went wrong';
        userModelMock.find.mockRejectedValue(new Error(errorMessage));

        await expect(service.findAll()).rejects.toThrowError(
          new InternalServerErrorException(`error:${errorMessage}`),
        );
      });
  });
});
