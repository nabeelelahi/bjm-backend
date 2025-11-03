import { Module } from '@nestjs/common';
import { UserFeedbackService } from './user-feedback.service';
import { name, schema } from './entities/user-feedback.entity'
import { UserFeedbackController } from './user-feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserContext } from 'src/user/user.context';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }]),],
  controllers: [UserFeedbackController],
  providers: [UserFeedbackService, UserContext, FileService],
})
export class UserFeedbackModule { }
