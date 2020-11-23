import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { IMatch } from './interfaces/match.interface';
import { MatchDTO } from './dto/match.dto';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel('Match') private readonly matchModel: Model<IMatch>
  ) {}

  async createMatch(match: MatchDTO) {
    const newMatch = await new this.matchModel(match)
    return newMatch.save()
  }

  async getAllMatches(): Promise<MatchDTO[]> {
    return await this.matchModel.find().exec()
  }

  async getOneMatch(id): Promise<MatchDTO> {
    return this.matchModel.findById(id)
  }

  async updateMatch(id, matchDTO: MatchDTO) {
    return this.matchModel.findByIdAndUpdate(id, matchDTO)
  }

  async deleteMatch(id) {
    return this.matchModel.findByIdAndDelete(id)
  }

  insertCollection(matchesCollection: MatchDTO[]) {
    return this.matchModel.insertMany(matchesCollection)
  }
}
