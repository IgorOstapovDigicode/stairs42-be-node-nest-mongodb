import { Document } from 'mongoose';

export interface ITeam extends Document {
  readonly id?: string,
  title: string
}
