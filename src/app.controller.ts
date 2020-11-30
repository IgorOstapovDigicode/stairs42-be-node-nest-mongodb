import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { TeamsService } from './teams/teams.service';
import { MatchesService } from './matches/matches.service';

@Controller()
export class AppController {
  data = []
  teamsCollection = []
  matchesCollection = []

  constructor(
    private readonly appService: AppService,
    private readonly teamsService: TeamsService,
    private readonly matchesService: MatchesService
  ) {}

  @Get('/data')
  async getData(@Res() res) {
    await this.getDataset(res)
    await this.createTeamsCollection(res)
    await this.createMatchesCollection(res)
    return res.status(HttpStatus.OK)
  }

  private async getDataset(res) {
    try {
      this.data = await this.appService.getDataset()
    }
    catch (error) {
      return res.status(HttpStatus.NOT_FOUND)
        .json({
          status: HttpStatus.NOT_FOUND,
          message: error.message
        })
    }
  }

  private async createTeamsCollection(res) {
    const teamsCollection = []
    this.data.forEach(match => {
      let team = teamsCollection.find(team => team.title === match.HomeTeam)
      if (!team) {
        teamsCollection.push({title: match.HomeTeam})
      }
      team = teamsCollection.find(team => team.title === match.AwayTeam)
      if (!team) {
        teamsCollection.push({title: match.AwayTeam})
      }
    })
    try {
      this.teamsCollection = await this.teamsService.insertTeamsCollection(teamsCollection)
    }
    catch (error) {
      return res.status(HttpStatus.BAD_REQUEST)
        .json({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        })
    }
  }

  private async createMatchesCollection(res) {
    try {
      const matchesCollection = this.data.map(
        match => {
          const awayTeam = this.teamsCollection.find(team => team.title === match.AwayTeam)
          const homeTeam = this.teamsCollection.find(team => team.title === match.HomeTeam)
          return {
            HomeTeam: homeTeam.id,
            AwayTeam: awayTeam.id,
            Date: match.Date.split('/').reverse().join('-'), // change to ISO string
            FTHG: match.FTHG,
            FTAG: match.FTAG
          }
        }
      )
      this.matchesCollection = await this.matchesService.insertCollection(matchesCollection)
    }
    catch (error) {
      return res.status(HttpStatus.BAD_REQUEST)
        .json({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        })
    }
  }
}
