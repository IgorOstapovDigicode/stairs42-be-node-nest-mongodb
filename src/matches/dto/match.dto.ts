import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MatchDTO {
  @IsString()
  readonly id?: string;

  @ApiProperty()
  @IsString()
  HomeTeam: string;

  @ApiProperty()
  @IsString()
  AwayTeam: string;

  @ApiProperty()
  @IsString()
  Date: string;

  @ApiProperty()
  @IsInt()
  FTHG: number;

  @ApiProperty()
  @IsInt()
  FTAG: number;
}
