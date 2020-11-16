import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema } from './schemas/team.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Team',
      schema: TeamSchema
    }])
  ],
  providers: [TeamsService],
  controllers: [TeamsController]
})
export class TeamsModule {}
