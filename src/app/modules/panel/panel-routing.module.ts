import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from './pages/flights/flights.component';
import { FlightComponent } from './pages/flight/flight.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { AccountGuard } from 'src/app/core/guards/account.guard';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "voos", component: FlightsComponent },
  { path: "voo/:id/:passengers", component: FlightComponent },
  { path: "conta", component: AccountComponent, canActivate: [AccountGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
