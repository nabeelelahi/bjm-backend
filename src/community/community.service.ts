import { name, schema } from './entities/community.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommunityDto } from './dto/create-community.dto';

export class CommunityService extends BaseService<
  typeof schema,
  CreateCommunityDto
> {
  constructor(@InjectModel(name) override _model: Model<typeof schema>) {
    super();
  }

  public override _softDelete = () => true;

  public override _fillables = () => [
    'title',
    'image_url',
    'status',
    'slug',
    'created_at',
  ];
}
