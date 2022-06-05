import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @ApiProperty()
  _id: string;

  @Prop()
  @ApiProperty({
    description: "The contact's name",
    example: 'John Doe',
    required: true,
  })
  name: string;

  @Prop()
  @ApiProperty({
    description: "The contact's phone number",
    example: '+1 (555) 555-5555',
    required: true,
  })
  phone: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
