import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { throwError } from 'rxjs';
import { TeamsService } from './teams/teams.service';

@Controller()
export class AppController {
  teamsCollection = []

  constructor(
    private readonly appService: AppService,
    private readonly teamsService: TeamsService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/data')
  async getData() {
    return await this.appService.getDataset()
      .then(
        data => {
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
          return this.teamsService.insertTeamsCollection(this.teamsCollection)
        }
      )
      .catch(
        error => throwError(error)
      )
  }
}
