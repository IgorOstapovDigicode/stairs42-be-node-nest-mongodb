import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchDTO } from './dto/match.dto';

@Controller('matches')
export class MatchesController {
  constructor( private matchesService: MatchesService ) {}

  @Post('/create')
  async createTeam(
    @Body() matchDTO: MatchDTO
  ) {
    try {
      await this.matchesService.createMatch(matchDTO)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  async getAllMatches(
    @Query() queryParams
  ) {
    try {
      return await this.matchesService.getAllMatches(queryParams)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }

  @Get('/:id')
  async getMatchById(
    @Param('id') id
  ) {
    try {
      return await this.matchesService.getOneMatch(id)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }

  @Put('/:id')
  async updateMatch(
    @Param('id') id,
    @Body() matchDTO: MatchDTO
  ) {
    try {
      await this.matchesService.updateMatch(id, matchDTO)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete('/:id')
  async deleteMatch(
    @Param('id') id
  ) {
    try {
      await this.matchesService.deleteMatch(id)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
