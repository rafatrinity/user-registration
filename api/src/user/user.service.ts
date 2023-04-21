import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserModel } from './models/user.model';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: typeof UserModel,
    private readonly configService: ConfigService,
  ) {}

  @Client({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_URI],
      queue: process.env.EMAIL_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  })
  client: ClientProxy;
  
  async create(user: CreateUserDto): Promise<User> {
    try {
      const email_queue = this.configService.get('EMAIL_QUEUE');
      const createdUser = await this.userModel.create(user);
      this.client.emit(email_queue, {
        message: 'success',
        email: user.email,
      });
      return createdUser.toObject();
    } catch (error) {
      throw new InternalServerErrorException(`error:${error}`);
    }
  }

  async findAll(page = 1, limit = 10): Promise<User[]> {
    if (page <= 0 || limit <= 0)
      throw new BadRequestException('page and limit must be positive.');
    const skip = (page - 1) * limit;

    try {
      const users = await this.userModel
        .find()
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
      return users.map(
        (user) =>
          ({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            avatar: user.avatar,
          } as User),
      );
    } catch (error) {
      throw new InternalServerErrorException(`error: ${error}`);
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).lean().exec();
    return user ? (user as User) : null;
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, { ...user }, { new: true })
        .lean()
        .exec();
      if (!updatedUser) throw new NotFoundException(`User not found`);
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(`error: ${error}`);
    }
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndRemove(id).lean().exec();
  }
}
