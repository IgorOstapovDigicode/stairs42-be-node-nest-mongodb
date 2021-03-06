import { HttpException, Injectable } from '@nestjs/common';
import { TeamsService } from '../teams/teams.service';
import { MatchesService } from '../matches/matches.service';
import { IResult } from './results.interface';

@Injectable()
export class ResultsService {
  constructor(
    private teamsService: TeamsService,
    private matchesService: MatchesService
  ) { }

  async getTeamResult(teamId: string): Promise<IResult> {
    try {
      const team = await this.teamsService.getOneTeam(teamId);
      const matches = await this.matchesService.getAllMatches({teamOne: team.id});
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
    catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async getTeamsResults(): Promise<IResult[]> {
    try {
      const results = [];
      const teams = await this.teamsService.getAllTeams();
      for (const team of teams) {
        const result = await this.getTeamResult(team.id);
        results.push(result);
      }
      return results;
    }
    catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
