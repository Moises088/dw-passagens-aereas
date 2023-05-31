import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { SearchContainerComponent } from './components/search-container/search-container.component';
import { PromotionCardComponent } from './components/promotion-card/promotion-card.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NgxMaskModule } from 'ngx-mask';
import { FlightsComponent } from './pages/flights/flights.component';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { FlightComponent } from './pages/flight/flight.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SearchContainerComponent,
    PromotionCardComponent,
    LoginComponent,
    RegisterComponent,
    FlightsComponent,
    FlightCardComponent,
    FlightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
