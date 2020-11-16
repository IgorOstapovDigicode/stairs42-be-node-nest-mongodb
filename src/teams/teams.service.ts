import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { ITeam } from './interfaces/team.interface';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel('Team') private readonly teamModel: Model<ITeam>
  ) {}

  async getAllTeams(): Promise<ITeam[]> {
    return await this.teamModel.find().exec()
  }
}
