import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { TeamsService } from './teams/teams.service';
import { MatchesService } from './matches/matches.service';

@Controller()
export class AppController {
  data = []

  constructor(
    private readonly appService: AppService,
    private readonly teamsService: TeamsService,
    private readonly matchesService: MatchesService
  ) {}

  @Get('/data')
  async getData() {
    await this.getDataset()
    await this.createTeamsCollection()
    await this.createMatchesCollection()
  }

  private async getDataset() {
    try {
      this.data = await this.appService.getDataset()
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }

  private async createTeamsCollection() {
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
      await this.teamsService.insertTeamsCollection(teamsCollection)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  private async createMatchesCollection() {
    try {
      const teamsCollection = await this.teamsService.getAllTeams()
      const matchesCollection = this.data.map(
        match => {
          const awayTeam = teamsCollection.find(team => team.title === match.AwayTeam)
          const homeTeam = teamsCollection.find(team => team.title === match.HomeTeam)
          return {
            HomeTeam: homeTeam.id,
            AwayTeam: awayTeam.id,
            Date: match.Date.split('/').reverse().join('-'), // change to ISO string
            FTHG: match.FTHG,
            FTAG: match.FTAG
          }
        }
    )
      await this.matchesService.insertCollection(matchesCollection)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
