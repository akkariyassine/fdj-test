import { Team } from 'src/app/teams/models/team.model';
export interface League {
  _id: string;
  name: string;
  sport: string;
  teams: Team[]; // Array of Team '_id' references
}
