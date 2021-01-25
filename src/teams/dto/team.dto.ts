import { IsString } from 'class-validator';

export class TeamDTO {
  @IsString()
  id?: string;

  @IsString()
  title: string
}
