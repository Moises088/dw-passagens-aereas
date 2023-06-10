import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../services/flights.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { lastValueFrom } from 'rxjs';
import { Ticket } from '../../interfaces/account.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  showInformationTab: boolean = true;
  showFlightsTab: boolean = false;
  user: { email: string, name: string, phone?: string } = { email: '', name: '', phone: '' };
  flights: Ticket[] = []

  constructor(
    private readonly flightsService: FlightsService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.toggleTab('flights');
  }

  toggleTab(tab: string) {
    this.showInformationTab = tab === 'information';
    this.showFlightsTab = tab === 'flights';

    if (this.showInformationTab) {
      this.getUserData();
    } else if (this.showFlightsTab) {
      this.getFlightData()
    }
  }

  private async getUserData() {
    const user = await this.authService.getUserData();

    if (user) this.user = user;
  }

  private async getFlightData() {
    const flights = await lastValueFrom(this.flightsService.getTickets());
    this.flights = flights;
    console.log(flights)
  }
}
