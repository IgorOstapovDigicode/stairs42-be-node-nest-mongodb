import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema({
  title: String
}, {versionKey: false})
