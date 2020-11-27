import { Module } from '@nestjs/common';
import { ResultsController } from './results.controller';
import { TeamsModule } from '../teams/teams.module';
import { MatchesModule } from '../matches/matches.module';

@Module({
  imports: [TeamsModule, MatchesModule],
  controllers: [ResultsController]
})
export class ResultsModule {}
