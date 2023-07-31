import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

@Schema()
export class Manager {
  @Prop({ required: true })
  @IsNotEmpty()
  username: string;

  @Prop({ required: true })
  @IsPhoneNumber('KR')
  phoneNumber: string;

  @Prop({ required: true })
  @IsEmail()
  email: string;

  @Prop({ default: Date.now })
  createdDate: Date;

  @Prop({ default: 0 })
  transactions: number;
}

export type ManagerDocument = Manager & Document;
export const ManagerSchema = SchemaFactory.createForClass(Manager);
