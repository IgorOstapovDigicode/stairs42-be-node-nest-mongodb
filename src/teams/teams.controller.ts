import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamDTO } from './dto/team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post('/create')
  async createTeam(
    @Body() teamDTO: TeamDTO
  ) {
    await this.teamsService.createTeam(teamDTO)
  }

  @Get()
  async getAllTeams(
    @Query('search') searchString,
  ) {
    try {
      return await this.teamsService.getAllTeams(searchString)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('/:id')
  async getTeamById(
    @Param('id') id
  ) {
    try {
      return await this.teamsService.getOneTeam(id)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }

  @Put('/:id')
  async updateTeam(
    @Param('id') id,
    @Body() teamDTO: TeamDTO
  ) {
    try {
      await this.teamsService.updateTeam(id, teamDTO)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete('/:id')
  async deleteTeam(
    @Param('id') id
  ) {
    try {
      await this.teamsService.deleteTeam(id)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
