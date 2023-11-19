import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/teams/models/team.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  fetchTeamDetails(teamId: string): Observable<any> {
    const url = `http://localhost:3000/api/teams/${teamId}`;
    return this.http.get<Team>(url);
  }
}
