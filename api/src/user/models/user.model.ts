import { string } from 'joi';
import mongoose, { Schema } from 'mongoose';

import { IUser } from '../interfaces/user.interface';

export const UserSchema = new Schema({
  first_name: string,
  last_name: string,
  email: string,
  avatar: string,
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);