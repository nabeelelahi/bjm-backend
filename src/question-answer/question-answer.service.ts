import { name, schema } from './entities/question-answer.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';

export class QuestionAnswerService extends BaseService<
  typeof schema,
  CreateQuestionAnswerDto
> {
  constructor(@InjectModel(name) override _model: Model<typeof schema>) {
    super();
  }

  public override _softDelete = () => true;

  public override _fillables = () => [
    'title',
    'description',
    'parent',
    'status',
    'slug',
    'created_at',
  ];
}
