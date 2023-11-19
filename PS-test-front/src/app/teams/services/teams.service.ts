// team.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrl = 'http://localhost:3000/api/leagues';

  constructor(private http: HttpClient) {}

  searchTeams(league: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/searchTeamsByLeague?league=${league}`);
  }

  getAllLeagueNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/allLeagueNames`);
  }
  // Implement other CRUD operations as methods here.
}
