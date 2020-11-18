import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchSchema } from './schemas/match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Match',
      schema: MatchSchema
    }])
  ],
  providers: [MatchesService],
  controllers: [MatchesController]
})
export class MatchesModule {}
