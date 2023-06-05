import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent {
  constructor(
    private readonly router: Router
  ) { }

  buyFlight() {
    const flightId = 123;
    this.router.navigate(['/voo', flightId]);
  }
}
