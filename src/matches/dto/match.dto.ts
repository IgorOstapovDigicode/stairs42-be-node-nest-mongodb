export class MatchDTO {
  readonly id?: string;
  HomeTeam: string;
  AwayTeam: string;
  Date: string;
  FTHG: number;
  FTAG: number;
}

export class MatchGetDTO {
  readonly id: string;
  HomeTeam: {id: string, title: string};
  AwayTeam: {id: string, title: string};
  Date: string;
  FTHG: number;
  FTAG: number;
}
