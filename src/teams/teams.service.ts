import { HttpException, Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { ITeam } from './interfaces/team.interface';
import { TeamDTO } from './dto/team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel('Team') private readonly teamModel: Model<ITeam>
  ) {}

  async createTeam(team: TeamDTO) {
    return new this.teamModel(team);
  }

  async getAllTeams(searchString = '.'): Promise<ITeam[]> {
    try {
      return await this.teamModel
        .find({title: {$regex: `${searchString}`, $options: 'i'}})
        .exec()
    }
    catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async getOneTeam(id): Promise<ITeam> {
    try {
      return this.teamModel.findById(id)
    }
    catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async updateTeam(id, teamDTO: TeamDTO) {
    try {
      this.teamModel.findByIdAndUpdate(id, teamDTO)
    }
    catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async deleteTeam(id) {
    try {
      this.teamModel.findByIdAndDelete(id)
    }
    catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async insertTeamsCollection(data: TeamDTO[]) {
    return this.teamModel.updateMany({}, data, { upsert: true })
  }
}
