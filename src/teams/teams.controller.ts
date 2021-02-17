import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamDTO } from './dto/team.dto';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { ITeam } from './interfaces/team.interface';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post('/create')
  @ApiBody({ type: TeamDTO })
  @ApiCreatedResponse({ type: TeamDTO })
  @ApiNotFoundResponse()
  createTeam(
    @Body() teamDTO: TeamDTO
  ): ITeam {
    return this.teamsService.createTeam(teamDTO);
  }

  @Get()
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiOkResponse({ type: [TeamDTO] })
  @ApiNotFoundResponse()
  getAllTeams(
    @Query('search') searchString,
  ): Promise<TeamDTO[]> {
    return this.teamsService.getAllTeams(searchString)
  }

  @Get('/:id')
  @ApiOkResponse({ type: TeamDTO })
  @ApiNotFoundResponse()
  getTeamById(
    @Param('id') id
  ) {
    return this.teamsService.getOneTeam(id)
  }

  @Put('/:id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  updateTeam(
    @Param('id') id,
    @Body() teamDTO: TeamDTO
  ) {
    return this.teamsService.updateTeam(id, teamDTO)
  }

  @Delete('/:id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  deleteTeam(
    @Param('id') id
  ) {
    return this.teamsService.deleteTeam(id)
  }
}
