import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsModule } from './teams/teams.module';
import { MatchesModule } from './matches/matches.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Igor_Ostapov:be-nest-mongo@cluster0.jzk4j.mongodb.net/stairs42-be-nest-mongodb?retryWrites=true&w=majority'),
    HttpModule,
    TeamsModule,
    MatchesModule,
    ResultsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
