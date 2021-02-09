import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('results')
export class ResultsController {
  constructor(
    private resultsService: ResultsService
  ) {}

  @Get()
  @ApiQuery({ name: 'sort', type: String, required: false })
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
