import { name, schema } from './entities/passport.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePassportDto } from './dto/create-passport.dto';
import {
  CondtionQuery,
  findAllReturnType,
  PaginatedDataDto,
} from 'src/base/base.dto';
import { omit } from 'radash';
import { UserContext } from 'src/user/user.context';

export class PassportService extends BaseService<
  typeof schema,
  CreatePassportDto
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
    'status',
    'slug',
    'status',
    'created_at',
  ];

  override async findAll(
    _query: CondtionQuery = {},
  ): Promise<
    | PaginatedDataDto<CreatePassportDto>
    | CreatePassportDto[]
    | CreatePassportDto
    | Partial<CreatePassportDto>
  > {
    const query = this._model.find();
    let page: string | number = _query.page;
    let limit: string | number = _query.limit;
    const condition = omit(_query, ['page', 'limit']);
    limit = typeof limit === 'string' ? parseInt(limit) : limit || 10;
    page = (typeof page === 'string' ? parseInt(page) : page) - 1 || 0;
    const records = (await query
      .where({ deleted_at: null })
      .select(this._fillables?.() || [])
      .skip(page * limit)
      .limit(limit)
      .exec()) as unknown as CreatePassportDto[];
    const count = await this._model.countDocuments(condition);
    console.log(this.userContext.get());
    return {
      records,
      count,
      pageCount: Math.ceil(count / limit),
      perPage: limit,
      currentPage: page + 1,
    } as PaginatedDataDto<CreatePassportDto>;
  }
}
