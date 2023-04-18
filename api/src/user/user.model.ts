import * as mongoose from 'mongoose';
import { UserSchema } from './user.schema';

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

export const UserModel = mongoose.model<User>('User', UserSchema);
