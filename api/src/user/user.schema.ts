import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';

@Schema({
  versionKey: false,
})
export class User {
  @Prop({required: true})
  first_name: string;

  @Prop({required: true})
  last_name: string;

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop()
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
