import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserFeedbackService } from './user-feedback.service';
import { CreateUserFeedbackDto } from './dto/create-user-feedback.dto';
import { UpdateUserFeedbackDto } from './dto/update-user-feedback.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BulkDeleteDto } from 'src/base/base.dto';

@Controller('api/user-feedback')
@ApiBearerAuth('Authorization')
export class UserFeedbackController {
  constructor(private readonly _service: UserFeedbackService) {}

  @Post()
  create(@Body() _body: CreateUserFeedbackDto) {
    return this._service.create(_body);
  }

  @Get()
  findAll(@Query() _query: object) {
    return this._service.findAll(_query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() _body: UpdateUserFeedbackDto) {
    return this._service.update(id, _body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() _body: BulkDeleteDto) {
    return this._service.remove(id, _body);
  }
}
