import { Document } from 'mongoose';
import { IMatch } from '../../matches/interfaces/match.interface';

export interface ITeam extends Document {
  readonly id?: string,
  title: string
}
