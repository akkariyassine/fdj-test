import { Player } from '../../players/models/player.model';
export interface Team {
  _id: string;
  name: string;
  thumbnail: string;
  players: Player[]; // Array of Player '_id' references
}
