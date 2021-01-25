import { IsString, IsInt } from 'class-validator';

export class MatchDTO {
  @IsString()
  readonly id?: string;

  @IsString()
  HomeTeam: string;

  @IsString()
  AwayTeam: string;

  @IsString()
  Date: string;

  @IsInt()
  FTHG: number;

  @IsInt()
  FTAG: number;
}
