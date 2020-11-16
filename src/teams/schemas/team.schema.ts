import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema({
  id: String,
  title: String
})
