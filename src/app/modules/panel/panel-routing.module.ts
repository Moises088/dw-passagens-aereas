import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { FlightComponent } from './pages/flight/flight.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "cadastrese", component: RegisterComponent },
  { path: "voos", component: FlightsComponent },
  { path: "voo/:id", component: FlightComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
