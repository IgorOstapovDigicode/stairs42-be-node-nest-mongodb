import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const MatchSchema = new Schema({
  HomeTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  AwayTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  Date: String,
  FTHG: Number,
  FTAG: Number
}, {versionKey: false})
