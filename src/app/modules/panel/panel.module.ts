import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchContainerComponent } from './components/search-container/search-container.component';
import { PromotionCardComponent } from './components/promotion-card/promotion-card.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { FlightComponent } from './pages/flight/flight.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from 'src/app/core/core.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    PanelComponent,
    HomeComponent,
    SearchContainerComponent,
    PromotionCardComponent,
    FlightsComponent,
    FlightCardComponent,
    FlightComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    CoreModule,
    AutocompleteLibModule
  ]
})
export class PanelModule { }
