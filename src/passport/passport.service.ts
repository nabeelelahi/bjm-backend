import { name, schema } from './entities/passport.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePassportDto } from './dto/create-passport.dto';
import { CondtionQuery, PaginatedDataDto } from 'src/base/base.dto';
import { omit } from 'radash';
import { UserContext } from 'src/user/user.context';
import { PassportMarkerService } from 'src/passport-marker/passport-marker.service';

export class PassportService extends BaseService<
  typeof schema,
  CreatePassportDto
> {
  constructor(
    @InjectModel(name) override _model: Model<typeof schema>,
    private readonly userContext: UserContext,
    private readonly _passport_marker_service: PassportMarkerService,
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
    let records = (await query
      .where({ deleted_at: null })
      .select(this._fillables?.() || [])
      .skip(page * limit)
      .limit(limit)
      .exec()) as unknown as CreatePassportDto[];
    const count = await this._model.countDocuments(condition);
    const user = this.userContext.get();
    if (user.role === 'super-admin')
      return {
        records,
        count,
        pageCount: Math.ceil(count / limit),
        perPage: limit,
        currentPage: page + 1,
      } as PaginatedDataDto<CreatePassportDto>;
    else {
      const markedPassports = (
        await this._passport_marker_service.findRecords({ user: user._id })
      ).map((i) => i.passport.toString());
      records = records.map((r) => ({
        _id: r._id,
        created_at: r.created_at,
        slug: r.slug,
        status: r.status,
        title: r.title,
        marked_done: markedPassports.includes(r._id.toString()),
      }));
      return {
        records,
        count,
        pageCount: Math.ceil(count / limit),
        perPage: limit,
        currentPage: page + 1,
      } as PaginatedDataDto<CreatePassportDto>;
    }
  }

  public async achievement() {
    const user = this.userContext.get();
    const total = await this._model.countDocuments();
    const completed = await this._passport_marker_service._model.countDocuments(
      { user: user._id },
    );
    const percentage = (completed / total) * 100;
    return {
      completed,
      total,
      percentage: Number(percentage.toFixed(2)),
    };
  }
}
