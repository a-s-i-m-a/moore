import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApartmentDocument = Apartment & Document;

@Schema()
export class Apartment {
  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  object: string;

  @Prop({ required: true })
  roof: number;

  @Prop({ default: Date.now })
  createdDate: Date;

  @Prop({ required: true })
  status: string;

  @Prop({ required: false })
  statusDescription: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  username: string;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
