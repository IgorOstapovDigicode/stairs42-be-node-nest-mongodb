import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TeamsService } from './teams/teams.service';
import { MatchesService } from './matches/matches.service';

@Controller()
export class AppController {
  teamsCollection = []

  constructor(
    private readonly appService: AppService,
    private readonly teamsService: TeamsService,
    private readonly matchesService: MatchesService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/data')
  async getData() {
    const data = await this.appService.getDataset()
    data.forEach(match => {
      let team = this.teamsCollection.find(team => team.title === match.HomeTeam)
      if (!team) {
        this.teamsCollection.push({title: match.HomeTeam})
      }
      team = this.teamsCollection.find(team => team.title === match.AwayTeam)
      if (!team) {
        this.teamsCollection.push({title: match.AwayTeam})
      }
    })
    const teamsCollection = await this.teamsService.insertTeamsCollection(this.teamsCollection)
    const matchesCollection = data.map(
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
}
