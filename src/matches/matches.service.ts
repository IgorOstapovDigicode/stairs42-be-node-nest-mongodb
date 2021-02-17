import { Injectable, NotFoundException } from '@nestjs/common';
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
    const matches = await this.matchModel
      .find(conditions)
      .populate(PathToPopulate.HOME_TEAM)
      .populate(PathToPopulate.AWAY_TEAM);
    if (!matches) {
      throw new NotFoundException();
    }
    return matches;
  }

  async getOneMatch(id): Promise<IMatch> {
    const match = await this.matchModel
      .findById(id)
      .populate(PathToPopulate.HOME_TEAM)
      .populate(PathToPopulate.AWAY_TEAM);
    if (!match) {
      throw new NotFoundException();
    }
    return match;
  }

  async updateMatch(id, matchDTO) {
    const result = await this.matchModel.findByIdAndUpdate(id, matchDTO);
    if (!result) {
      throw new NotFoundException();
    }
  }

  async deleteMatch(id) {
    const result = await this.matchModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException();
    }
  }

  insertCollection(matchesCollection: MatchDTO[]) {
    return this.matchModel.updateMany({}, matchesCollection, { upsert: true }).exec()
  }
}
