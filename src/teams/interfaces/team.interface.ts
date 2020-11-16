import { Document } from 'mongoose';

export interface ITeam extends Document {
  readonly id?: string,
  readonly title: string
}
