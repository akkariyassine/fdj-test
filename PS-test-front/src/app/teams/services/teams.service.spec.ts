import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TeamService } from './teams.service';

describe('TeamService', () => {
  let service: TeamService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamService],
    });
    service = TestBed.inject(TeamService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search teams by league', () => {
    const mockTeams = [
      { id: '1', name: 'Team A', league: 'League 1' },
      // ... other teams
    ];

    service.searchTeams('League 1').subscribe((teams: any) => {
      expect(teams.length).toBe(mockTeams.length);
      expect(teams).toEqual(mockTeams);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${service['apiUrl']}/searchTeamsByLeague?league=League 1`,
    });

    req.flush(mockTeams);
  });

  it('should get all league names', () => {
    const mockLeagueNames = ['League 1', 'League 2'];

    service.getAllLeagueNames().subscribe((leagueNames: any) => {
      expect(leagueNames.length).toBe(mockLeagueNames.length);
      expect(leagueNames).toEqual(mockLeagueNames);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${service['apiUrl']}/allLeagueNames`,
    });

    req.flush(mockLeagueNames);
  });
});
