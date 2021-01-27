import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(
    private resultsService: ResultsService
  ) {}

  @Get()
  async getResultsForAll(
    @Query('sort') sort
  ) {
    const results = await this.resultsService.getTeamsResults()
    if (sort && sort === 'rating') {
      results.sort((currTeam, nextTeam) => {
        return nextTeam.points - currTeam.points
      })
    }
    return results
  }

  @Get(':id')
  async getResultsForOne(
    @Param('id') teamId,
  ) {
    return this.resultsService.getTeamResult(teamId)
  }
}
