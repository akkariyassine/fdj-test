import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamListComponent } from './team-list/team-list.component';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TeamListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    TeamsRoutingModule,
  ],
})
export class TeamsModule {}
