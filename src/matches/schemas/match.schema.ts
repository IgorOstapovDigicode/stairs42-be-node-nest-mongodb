import * as mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema({
  HomeTeam: String,
  AwayTeam: String,
  Date: String,
  FTGH: String,
  FTAG: String
}, {versionKey: false})
