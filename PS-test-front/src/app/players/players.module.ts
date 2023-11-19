import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { PlayersListComponent } from './players-list/players-list.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr);

@NgModule({
  declarations: [PlayersListComponent],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [
    { provide: localeFr, useValue: 'fr-FR' }, // This sets the locale to Germany
  ],
})
export class PlayersModule {}
