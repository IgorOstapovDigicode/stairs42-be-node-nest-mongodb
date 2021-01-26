import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchDTO } from './dto/match.dto';

@Controller('matches')
export class MatchesController {
  constructor( private matchesService: MatchesService ) {}

  @Post('/create')
  createTeam(
    @Body() matchDTO: MatchDTO
  ) {
    this.matchesService.createMatch(matchDTO)
  }

  @Get()
  getAllMatches(
    @Query() queryParams
  ) {
    try {
      return this.matchesService.getAllMatches(queryParams)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }

  @Get('/:id')
  getMatchById(
    @Param('id') id
  ) {
    try {
      return this.matchesService.getOneMatch(id)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }

  @Put('/:id')
  updateMatch(
    @Param('id') id,
    @Body() matchDTO: MatchDTO
  ) {
    try {
      this.matchesService.updateMatch(id, matchDTO)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete('/:id')
  deleteMatch(
    @Param('id') id
  ) {
    try {
      this.matchesService.deleteMatch(id)
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
