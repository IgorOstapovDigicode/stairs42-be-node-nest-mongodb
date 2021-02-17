import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { ITeam } from './interfaces/team.interface';
import { TeamDTO } from './dto/team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel('Team') private readonly teamModel: Model<ITeam>
  ) {}

  createTeam(team: TeamDTO) {
    return new this.teamModel(team);
  }

  async getAllTeams(searchString = '.'): Promise<ITeam[]> {
    const teams = await this.teamModel
      .find({title: {$regex: `${searchString}`, $options: 'i'}});
    if (!teams) {
      throw new NotFoundException();
    }
    return teams;
  }

  async getOneTeam(id): Promise<ITeam> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      throw new NotFoundException();
    }
    return team;
  }

  async updateTeam(id, teamDTO: TeamDTO) {
    const result = await this.teamModel.findByIdAndUpdate(id, teamDTO);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async deleteTeam(id) {
    const result = await this.teamModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async insertTeamsCollection(data: TeamDTO[]) {
    return this.teamModel.updateMany({}, data, { upsert: true })
  }
}
