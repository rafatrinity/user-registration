import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser.toObject();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().select('-password').lean().exec();
    return users.map(
      (user) =>
        ({
          id: user._id,
          name: user.name,
          email: user.email,
        } as User),
    );
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).lean().exec();
    return user ? (user as User) : null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel.findById(id).exec();
    const password = updateUserDto.password
      ? updateUserDto.password
      : existingUser.password;
    const user = await this.userModel
      .findByIdAndUpdate(id, { ...updateUserDto, password }, { new: true })
      .lean()
      .exec();
    return user ? (user as User) : null;
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndRemove(id).lean().exec();
  }
}
