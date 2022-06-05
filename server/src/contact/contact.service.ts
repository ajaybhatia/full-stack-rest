import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact, ContactDocument } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async create(contact: CreateContactDto): Promise<Contact> {
    return await this.contactModel.create(contact);
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactModel.find();
  }

  async findOne(id: ObjectId): Promise<Contact> {
    return await this.contactModel.findById(id);
  }

  async update(id: ObjectId, contact: UpdateContactDto): Promise<Contact> {
    return await this.contactModel.findByIdAndUpdate(id, contact, {
      new: true,
    });
  }

  async remove(id: ObjectId): Promise<Contact> {
    return await this.contactModel.findByIdAndRemove(id);
  }
}
