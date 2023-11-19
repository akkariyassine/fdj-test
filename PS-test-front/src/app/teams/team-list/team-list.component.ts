import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';
import { TeamService } from '../services/teams.service';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, filter, switchMap, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];
  searchInput = new FormControl('');
  searchValue: string = '';
  private searchTerms = new Subject<string>();
  private autocompleteTerms = new Subject<string>();
  isInit: boolean = true;
  allOptions: string[] = [];
  suggestion: string = '';

  constructor(private teamService: TeamService, private route: Router) {}

  ngOnInit(): void {
    this.teamService.getAllLeagueNames().subscribe((data) => {
      this.allOptions = data;
    });

    this.autocompleteTerms
      .pipe(
        debounceTime(500),
        map((input) => this.getFirstSuggestion(input))
      )
      .subscribe((suggestion) => {
        this.suggestion = suggestion;
      });

    this.searchTerms
      .pipe(
        debounceTime(500),
        filter((term) => term.length > 2),
        switchMap((term) => this.teamService.searchTeams(term))
      )
      .subscribe((data) => {
        this.isInit = false;
        this.teams = data;
      });
  }

  searchInputValue(): string {
    return this.suggestion;
  }
  navigateToTeam(team: Team) {
    this.route.navigate(['players/' + team._id]);
  }

  onSearchChange(event: any): void {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value.trim();

    this.searchValue = value;
    this.autocompleteTerms.next(value);
  }

  private getFirstSuggestion(input: string): string {
    if (!input) return '';

    const matchingOption = this.allOptions.find((option) =>
      option.toLowerCase().includes(input.toLowerCase())
    );
    return matchingOption ? matchingOption : '';
  }

  cancel(): void {
    this.isInit = true;
    this.teams = [];
    this.searchValue = '';
    this.suggestion = '';
    this.searchInput.reset();
    this.searchTerms.next('');
  }

  search(): void {
    this.searchTerms.next(this.searchValue);
  }
}
