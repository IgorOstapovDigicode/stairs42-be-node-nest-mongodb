import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { MatchesService } from '../matches/matches.service';
import { TeamsService } from '../teams/teams.service';
import { ITeam } from '../teams/interfaces/team.interface';

@Controller('results')
export class ResultsController {
  constructor(
    private teamsService: TeamsService,
    private matchesService: MatchesService
  ) {}

  @Get()
  async getResultsForAll(
    @Query('sort') sort
  ) {
    try {
      const results = []
      const teams = await this.teamsService.getAllTeams()
      for (const team of teams) {
        const result = await this.getTeamResult(team)
        results.push(result)
      }
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
      const team = await this.teamsService.getOneTeam(teamId)
      return await this.getTeamResult(team)
    }
    catch(error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }

  private async getTeamResult(team: ITeam) {
    const matches = await this.matchesService.getAllMatches({teamOne: team.id})
    const result = {
      team,
      won: 0,
      draw: 0,
      loss: 0,
      goals_for: 0,
      goals_against: 0,
      goals_difference: 0,
      points: 0
    }
    for (const match of matches) {
      if (team.id === match.HomeTeam.id) {
        result.goals_for += match.FTHG
        result.goals_against += match.FTAG
      }
      if (team.id === match.AwayTeam.id) {
        result.goals_for += match.FTAG
        result.goals_against += match.FTHG
      }
      result.goals_difference = Math.abs(result.goals_for - result.goals_against)
      if (
        team.id === match.AwayTeam.id && match.FTAG === match.FTHG ||
        team.id === match.HomeTeam.id && match.FTAG === match.FTHG
      ) {
        result.draw++
        result.points += 1 // points for draw
      }
      if (
        team.id === match.AwayTeam.id && match.FTAG > match.FTHG ||
        team.id === match.HomeTeam.id && match.FTHG > match.FTAG
      ) {
        result.won++
        result.points += 3 // points for win
      }
      if (
        team.id === match.AwayTeam.id && match.FTAG < match.FTHG ||
        team.id === match.HomeTeam.id && match.FTHG < match.FTAG
      ) {
        result.loss++
      }
    }
    return result
  }
}
