import { name, schema } from './entities/passport.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePassportDto } from './dto/create-passport.dto';

export class PassportService extends BaseService<
  typeof schema,
  CreatePassportDto
> {
  constructor(@InjectModel(name) override _model: Model<typeof schema>) {
    super();
  }

  public override _softDelete = () => true;

  public override _fillables = () => ['title', 'status', 'slug', 'created_at'];
}
