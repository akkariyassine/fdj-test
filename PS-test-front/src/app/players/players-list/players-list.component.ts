import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Team } from 'src/app/teams/models/team.model';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
})
export class PlayersListComponent {
  id: string = '5d2d01fdda07b95bb8f16f0a';
  team!: Team;

  constructor(
    public playerService: PlayerService,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.fetchTeamDetails(id);
      }
    });
  }

  fetchTeamDetails(id: string): void {
    this.playerService.fetchTeamDetails(id).subscribe((teamData) => {
      this.team = teamData;
    });
  }
  goBack(): void {
    this.location.back();
  }
}
