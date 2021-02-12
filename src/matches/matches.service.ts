import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { IMatch } from './interfaces/match.interface';
import { MatchDTO } from './dto/match.dto';
import { PathToPopulate } from './constants';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel('Match') private readonly matchModel: Model<IMatch>
  ) {}

  createMatch(match: MatchDTO) {
    return new this.matchModel(match);
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
        { HomeTeam: teamTwo, AwayTeam: teamOne }]
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
    return this.matchModel
      .find(conditions)
      .populate(PathToPopulate.HOME_TEAM)
      .populate(PathToPopulate.AWAY_TEAM)
  }

  async getOneMatch(id): Promise<IMatch> {
    try {
      return this.matchModel
        .findById(id)
        .populate(PathToPopulate.HOME_TEAM)
        .populate(PathToPopulate.AWAY_TEAM)
    }
    catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  updateMatch(id, matchDTO) {
    try {
      this.matchModel.findByIdAndUpdate(id, matchDTO)
    }
    catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  deleteMatch(id) {
    try {
      this.matchModel.findByIdAndDelete(id)
    }
    catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  insertCollection(matchesCollection: MatchDTO[]) {
    return this.matchModel.updateMany({}, matchesCollection, { upsert: true }).exec()
  }
}
