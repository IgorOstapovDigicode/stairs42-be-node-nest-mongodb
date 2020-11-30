import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
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

  async getAllMatches(queryParams?): Promise<IMatch[]> {
    const {teamOne, teamTwo, dateFrom, dateTo} = queryParams
    let conditions: FilterQuery<IMatch> = {}
    if (teamOne) conditions = {
      $or: [{ HomeTeam: teamOne }, { AwayTeam: teamOne }]
    }
    if (teamTwo) conditions = {
      $or: [
        { HomeTeam: teamOne, AwayTeam: teamTwo },
        { HomeTeam: teamTwo, AwayTeam: teamOne }
      ]
    }
    if (dateFrom) {
      conditions.Date = { $gte: dateFrom }
    }
    if (dateTo) {
      conditions.Date = { $lte: dateTo }
    }
    if (dateFrom && dateTo) {
      conditions.Date = {
        $gte: dateFrom,
        $lte: dateTo
      }
    }
    return await this.matchModel
      .find(conditions)
      .populate('HomeTeam')
      .populate('AwayTeam')
      .exec()
  }

  async getOneMatch(id): Promise<IMatch> {
    return this.matchModel
      .findById(id)
      .populate('HomeTeam')
      .populate('AwayTeam')
  }

  async updateMatch(id, matchDTO) {
    return this.matchModel.findByIdAndUpdate(id, matchDTO)
  }

  async deleteMatch(id) {
    return this.matchModel.findByIdAndDelete(id)
  }

  insertCollection(matchesCollection: MatchDTO[]) {
    return this.matchModel.insertMany(matchesCollection)
  }
}
