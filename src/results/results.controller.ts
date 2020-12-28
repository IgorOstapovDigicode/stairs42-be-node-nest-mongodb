import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { MatchesService } from '../matches/matches.service';
import { TeamsService } from '../teams/teams.service';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(
    private teamsService: TeamsService,
    private matchesService: MatchesService,
    private resultsService: ResultsService
  ) {}

  @Get()
  async getResultsForAll(
    @Query('sort') sort
  ) {
    try {
      const results = await this.resultsService.getTeamsResults()
      if (sort && sort === 'rating') {
        results.sort((currTeam, nextTeam) => {
          return nextTeam.points - currTeam.points
        })
      }
      return results
    }
    catch(error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }

  @Get(':id')
  async getResultsForOne(
    @Param('id') teamId,
  ) {
    try {
      return this.resultsService.getTeamResult(teamId)
    }
    catch(error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }
}
