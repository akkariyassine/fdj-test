import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamListComponent } from './team-list.component';
import { TeamService } from '../services/teams.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;
  let mockTeamService: jasmine.SpyObj<TeamService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create mock services
    mockTeamService = jasmine.createSpyObj('TeamService', [
      'getAllLeagueNames',
      'searchTeams',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Set up mock return values
    mockTeamService.getAllLeagueNames.and.returnValue(
      of(['League 1', 'League 2'])
    );
    mockTeamService.searchTeams.and.returnValue(of([])); // Return empty array for searchTeams

    await TestBed.configureTestingModule({
      declarations: [TeamListComponent],
      // Provide the mock services
      providers: [
        { provide: TeamService, useValue: mockTeamService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all league names on init', () => {
    expect(mockTeamService.getAllLeagueNames).toHaveBeenCalled();
    expect(component.allOptions).toEqual(['League 1', 'League 2']);
  });

  it('should reset search on cancel', () => {
    component.cancel();
    expect(component.teams).toEqual([]);
    expect(component.searchValue).toBe('');
    expect(component.suggestion).toBe('');
    expect(component.isInit).toBeTrue();
  });

  it('should navigate to the correct team details', () => {
    const team = { _id: '123', name: 'Team Name', thumbnail: '', players: [] };
    component.navigateToTeam(team);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['players/' + team._id]);
  });
});
