import { ApiProperty } from '@nestjs/swagger';
import { TeamDTO } from '../teams/dto/team.dto';

export class ResultDTO {
  @ApiProperty()
  team: TeamDTO;

  @ApiProperty()
  won: number;

  @ApiProperty()
  draw: number;

  @ApiProperty()
  loss: number;

  @ApiProperty()
  goals_for: number;

  @ApiProperty()
  goals_against: number;

  @ApiProperty()
  goals_difference: number;

  @ApiProperty()
  points: number;
}
