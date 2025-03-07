import { Module } from '@nestjs/common';
import { DocGuideService } from './doc-guide.service';
import { DocGuideController } from './doc-guide.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { name, schema } from './entities/doc-guide.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }])],
  controllers: [DocGuideController],
  providers: [DocGuideService],
  exports: [DocGuideService],
})
export class DocGuideModule {}
