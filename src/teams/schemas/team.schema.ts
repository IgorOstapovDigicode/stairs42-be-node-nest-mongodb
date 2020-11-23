import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const TeamSchema = new mongoose.Schema({
  title: String,
  matches: [{
    type: Schema.Types.ObjectId,
    ref: 'Match'
  }]
}, {versionKey: false})
