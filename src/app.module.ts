import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
