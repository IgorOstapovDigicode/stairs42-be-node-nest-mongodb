import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TeamDTO {
  @IsString()
  @ApiProperty()
  id?: string;

  @IsString()
  @ApiProperty()
  title: string
}
