import { name, schema } from './entities/user-feedback.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserFeedbackDto } from './dto/create-user-feedback.dto';
import { baseFindQueryType } from 'src/base/base.dto';
import { UserContext } from 'src/user/user.context';

export class UserFeedbackService extends BaseService<
  typeof schema,
  CreateUserFeedbackDto
> {
  constructor(
    @InjectModel(name) override _model: Model<typeof schema>,
    private readonly userContext: UserContext,
  ) {
    super();
  }

  public override _softDelete = () => true;

  public override _fillables = () => [
    'title',
    'description',
    'user',
    'parent',
    'community',
    'status',
    'slug',
    'created_at',
  ];

  protected override _beforeCreateHook = async (
    payload: Partial<CreateUserFeedbackDto>,
  ) => {
    const { _id, role, name, address, email, mobile_no, username } =
      this.userContext.get();
    payload.user = {
      _id,
      role,
      name,
      address,
      email,
      mobile_no,
      username,
    };
    console.log('craete product payload', payload);
  };
}
