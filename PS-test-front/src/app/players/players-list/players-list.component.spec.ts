import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersListComponent } from './players-list.component';
import { PlayerService } from '../services/player.service';
import { Location } from '@angular/common';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('PlayersListComponent', () => {
  let component: PlayersListComponent;
  let fixture: ComponentFixture<PlayersListComponent>;
  let mockPlayerService: jasmine.SpyObj<PlayerService>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    // Create mock services
    mockPlayerService = jasmine.createSpyObj('PlayerService', [
      'fetchTeamDetails',
    ]);
    mockLocation = jasmine.createSpyObj('Location', ['back']);

    // Set up ActivatedRoute mock to return the id
    mockActivatedRoute = {
      paramMap: of(convertToParamMap({ id: '5d2d01fdda07b95bb8f16f0a' })),
    };

    // Set up mock return values
    mockPlayerService.fetchTeamDetails.and.returnValue(
      of(/* Mock team data here */)
    );

    await TestBed.configureTestingModule({
      declarations: [PlayersListComponent],
      // Provide the mock services and mock route
      providers: [
        { provide: PlayerService, useValue: mockPlayerService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch team details based on URL parameter id', () => {
    expect(mockPlayerService.fetchTeamDetails).toHaveBeenCalledWith(
      '5d2d01fdda07b95bb8f16f0a'
    );
  });

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
