import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from './pages/flights/flights.component';
import { FlightComponent } from './pages/flight/flight.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "voos", component: FlightsComponent },
  { path: "voo/:id/:passengers", component: FlightComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
