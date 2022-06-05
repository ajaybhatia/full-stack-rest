import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { ValidateObjectIdPipe } from './shared/pipes/validate-object-id.pipe';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ operationId: 'createContact' })
  @ApiBody({
    type: CreateContactDto,
  })
  @ApiResponse({
    status: 200,
    type: Contact,
  })
  async create(@Body() contact: Contact): Promise<Contact> {
    return await this.contactService.create(contact);
  }

  @Get('all')
  @ApiOperation({
    operationId: 'contacts',
  })
  @ApiResponse({
    status: 200,
    type: [Contact],
  })
  async findAll(): Promise<Contact[]> {
    return await this.contactService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    operationId: 'contact',
  })
  @ApiResponse({
    status: 200,
    type: Contact,
  })
  async findOne(
    @Param('id', new ValidateObjectIdPipe()) id: ObjectId,
  ): Promise<Contact> {
    return await this.contactService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    operationId: 'updateContact',
  })
  @ApiBody({
    type: UpdateContactDto,
  })
  @ApiResponse({
    status: 200,
    type: Contact,
  })
  async update(
    @Param('id', new ValidateObjectIdPipe()) id: ObjectId,
    @Body() contact: Contact,
  ): Promise<Contact> {
    return await this.contactService.update(id, contact);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  @ApiOperation({
    operationId: 'deleteContact',
  })
  @ApiResponse({
    status: 200,
    type: Contact,
  })
  async remove(
    @Param('id', new ValidateObjectIdPipe()) id: ObjectId,
  ): Promise<Contact> {
    return await this.contactService.remove(id);
  }
}
