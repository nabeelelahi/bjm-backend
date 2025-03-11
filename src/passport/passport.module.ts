import { Module } from '@nestjs/common';
import { PassportService } from './passport.service';
import { PassportController } from './passport.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { name, schema } from './entities/passport.entity';
import { UserContext } from 'src/user/user.context';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }])],
  controllers: [PassportController],
  providers: [PassportService, UserContext],
})
export class PassportModule {}
