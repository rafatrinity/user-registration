import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop()
  @IsNotEmpty()
  name: string;

  @Prop()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop()
  password?: string;

  // authenticate(password: string): boolean {
  //   return true
  // }

  // updateInfo(name: string, email: string): void {
  //   this.name = name;
  //   this.email = email;
  // }
}

export type UserDocument = User & Document;

export const UserModel = SchemaFactory.createForClass(User);
