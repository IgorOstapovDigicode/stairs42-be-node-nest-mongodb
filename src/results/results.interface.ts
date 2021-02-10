import { ITeam } from '../teams/interfaces/team.interface';

export interface IResult {
  team: ITeam;
  won: number;
  draw: number;
  loss: number;
  goals_for: number;
  goals_against: number;
  goals_difference: number;
  points: number;
}
