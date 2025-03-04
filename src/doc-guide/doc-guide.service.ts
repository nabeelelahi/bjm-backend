import { name, schema } from './entities/doc-guide.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDocGuideDto } from './dto/create-doc-guide.dto';

export class DocGuideService extends BaseService<
  typeof schema,
  CreateDocGuideDto
> {
  constructor(@InjectModel(name) override _model: Model<typeof schema>) {
    super();
  }

  public override _softDelete = () => true;

  public override _fillables = () => [
    'title',
    'sub_title',
    'file_url',
    'status',
    'slug',
    'created_at',
  ];
}
