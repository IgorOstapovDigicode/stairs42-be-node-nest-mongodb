import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamDTO } from './dto/team.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post('/create')
  @ApiBody({ type: TeamDTO })
  @ApiCreatedResponse({ type: TeamDTO })
  createTeam(
    @Body() teamDTO: TeamDTO
  ): Promise<TeamDTO> {
    return this.teamsService.createTeam(teamDTO);
  }

  @Get()
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiOkResponse({ type: [TeamDTO] })
  getAllTeams(
    @Query('search') searchString,
  ): Promise<TeamDTO[]> {
    return this.teamsService.getAllTeams(searchString)
  }

  @Get('/:id')
  @ApiOkResponse({ type: TeamDTO })
  getTeamById(
    @Param('id') id
  ) {
    return this.teamsService.getOneTeam(id)
  }

  @Put('/:id')
  updateTeam(
    @Param('id') id,
    @Body() teamDTO: TeamDTO
  ) {
    this.teamsService.updateTeam(id, teamDTO)
  }

  @Delete('/:id')
  async deleteTeam(
    @Param('id') id
  ) {
    await this.teamsService.deleteTeam(id)
  }
}
