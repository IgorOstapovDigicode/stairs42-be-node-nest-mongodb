import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamDTO } from './dto/team.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post('/create')
  createTeam(
    @Body() teamDTO: TeamDTO
  ) {
    return this.teamsService.createTeam(teamDTO);
  }

  @Get()
  @ApiQuery({ name: 'search', type: String, required: false })
  async getAllTeams(
    @Query('search') searchString,
  ) {
    return await this.teamsService.getAllTeams(searchString)
  }

  @Get('/:id')
  async getTeamById(
    @Param('id') id
  ) {
    return await this.teamsService.getOneTeam(id)
  }

  @Put('/:id')
  async updateTeam(
    @Param('id') id,
    @Body() teamDTO: TeamDTO
  ) {
    await this.teamsService.updateTeam(id, teamDTO)
  }

  @Delete('/:id')
  async deleteTeam(
    @Param('id') id
  ) {
    await this.teamsService.deleteTeam(id)
  }
}
