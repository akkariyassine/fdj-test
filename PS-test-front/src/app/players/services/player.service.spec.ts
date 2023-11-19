import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PlayerService } from './player.service';
import { Team } from 'src/app/teams/models/team.model';

describe('PlayerService', () => {
  let service: PlayerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [PlayerService],
    });
    service = TestBed.inject(PlayerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no unmatched requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch team details', () => {
    const mockTeam: Team = {
      _id: '5d2d01fdda07b95bb8f16f0a',
      name: 'Arsenal',
      thumbnail: 'path/to/thumbnail.png',
      players: [],
    };

    service.fetchTeamDetails('5d2d01fdda07b95bb8f16f0a').subscribe((team) => {
      expect(team).toEqual(mockTeam);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/api/teams/5d2d01fdda07b95bb8f16f0a'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockTeam); // Simulate a response from the server by flushing mock data.
  });
});
