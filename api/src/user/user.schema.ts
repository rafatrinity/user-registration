import { Document, model, Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export const UserModel = model<IUser>('User', UserSchema);
