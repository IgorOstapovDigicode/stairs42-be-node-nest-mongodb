import { Document } from "mongoose";

export interface IMatch extends Document {
  readonly id?: string;
  HomeTeam: {id: string, title: string};
  AwayTeam: {id: string, title: string};
  Date: string;
  FTHG: number;
  FTAG: number;
}
