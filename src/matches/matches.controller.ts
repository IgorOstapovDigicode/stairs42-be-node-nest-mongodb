import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchDTO } from './dto/match.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery
} from '@nestjs/swagger';
import { IMatch } from './interfaces/match.interface';

@Controller('matches')
export class MatchesController {
  constructor( private matchesService: MatchesService ) {}

  @Post('/create')
  @ApiBody({ type: MatchDTO })
  @ApiCreatedResponse({ type: MatchDTO })
  createTeam(
    @Body() matchDTO: MatchDTO
  ) {
    return this.matchesService.createMatch(matchDTO)
  }

  @Get()
  @ApiQuery({ name: 'teamOne', type: String, required: false })
  @ApiQuery({ name: 'teamTwo', type: String, required: false })
  @ApiQuery({ name: 'dateFrom', type: Date, required: false })
  @ApiQuery({ name: 'dateTo', type: Date, required: false })
  @ApiOkResponse({ type: [MatchDTO] })
  getAllMatches(
    @Query() queryParams
  ): Promise<IMatch[]> {
    return this.matchesService.getAllMatches(queryParams);
  }

  @Get('/:id')
  @ApiOkResponse({ type: MatchDTO })
  @ApiNotFoundResponse()
  getMatchById(
    @Param('id') id
  ) {
    return this.matchesService.getOneMatch(id);
  }

  @Put('/:id')
  @ApiBody({ type: [MatchDTO] })
  updateMatch(
    @Param('id') id,
    @Body() matchDTO: MatchDTO
  ) {
    return this.matchesService.updateMatch(id, matchDTO)
  }

  @Delete('/:id')
  deleteMatch(
    @Param('id') id
  ) {
    return this.matchesService.deleteMatch(id)
  }
}
