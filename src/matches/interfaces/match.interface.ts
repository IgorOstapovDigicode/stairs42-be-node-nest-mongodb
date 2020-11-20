import { Document } from "mongoose";

export interface IMatch extends Document {
  readonly id?: string;
  HomeTeam: string;
  AwayTeam: string;
  Date: string;
  FTHG: string;
  FTAG: string;
}
