import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { IResult } from './results.interface';
import { ResultDTO } from './result.dto';

@Controller('results')
export class ResultsController {
  constructor(
    private resultsService: ResultsService
  ) {}

  @Get()
  @ApiQuery({ name: 'sort', type: String, required: false })
  @ApiOkResponse({ type: [ResultDTO] })
  async getResultsForAll (
    @Query('sort') sort
  ): Promise<IResult[]> {
    const results = await this.resultsService.getTeamsResults()
    if (sort && sort === 'rating') {
      results.sort((currTeam, nextTeam) => {
        return nextTeam.points - currTeam.points
      })
    }
    return results
  }

  @Get(':id')
  @ApiOkResponse({ type: ResultDTO })
  getResultsForOne(
    @Param('id') teamId,
  ): Promise<IResult> {
    return this.resultsService.getTeamResult(teamId);
  }
}
