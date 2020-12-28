import { Module } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { TeamsModule } from '../teams/teams.module';
import { MatchesModule } from '../matches/matches.module';
import { ResultsService } from './results.service';

@Module({
  imports: [TeamsModule, MatchesModule],
  controllers: [ResultsController],
  providers: [ResultsService]
})
export class ResultsModule {}
