import { name, schema } from './entities/article.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';

export class ArticleService extends BaseService<
  typeof schema,
  CreateArticleDto
> {
  constructor(@InjectModel(name) override _model: Model<typeof schema>) {
    super();
  }

  public override _softDelete = () => true;

  public override _fillables = () => [
    'title',
    'tag',
    'description',
    'title',
    'image_url',
    'status',
    'slug',
    'created_at',
  ];
}
