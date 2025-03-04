import { Module } from '@nestjs/common';
import { QuestionAnswerService } from './question-answer.service';
import { QuestionAnswerController } from './question-answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { name, schema } from './entities/question-answer.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }])],
  controllers: [QuestionAnswerController],
  providers: [QuestionAnswerService],
})
export class QuestionAnswerModule {}
