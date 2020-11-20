import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchDTO } from './dto/match.dto';

@Controller('matches')
export class MatchesController {
  constructor( private matchesService: MatchesService ) {}

  @Post('/create')
  async createTeam(
    @Body() matchDTO: MatchDTO
  ) {
    await this.matchesService.createMatch(matchDTO)
  }

  @Get()
  async getAllMatches() {
    return await this.matchesService.getAllMatches()
  }

  @Get('/:id')
  async getMatchById(
    @Param('id') id
  ) {
    return await this.matchesService.getOneMatch(id)
  }

  @Put('/:id')
  async updateTeam(
    @Param('id') id,
    @Body() matchDTO: MatchDTO
  ) {
    await this.matchesService.updateMatch(id, matchDTO)
  }

  @Delete('/:id')
  async deleteTeam(
    @Param('id') id
  ) {
    await this.matchesService.deleteMatch(id)
  }
}
