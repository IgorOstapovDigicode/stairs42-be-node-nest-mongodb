import { Injectable } from '@nestjs/common';
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
    const newTeam = await new this.teamModel(team)
    return newTeam.save()
  }

  async getAllTeams(): Promise<ITeam[]> {
    return await this.teamModel.find().exec()
  }

  async getOneTeam(id): Promise<ITeam> {
    return this.teamModel.findById(id)
  }

  async updateTeam(id, teamDTO: TeamDTO) {
    // return this.teamModel.findByIdAndUpdate(id, teamDTO)
  }

  async deleteTeam(id) {
    return this.teamModel.findByIdAndDelete(id)
  }

  insertCollection(data) {
    return this.teamModel.insertMany(data)
  }
}
