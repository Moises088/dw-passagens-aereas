import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent {

  @Input() flight: any;

  constructor(
    private readonly router: Router
  ) { }

  buyFlight() {
    const flightId = 123;
    this.router.navigate(['/voo', flightId]);
  }

  getPaymentCard() {
    return this.flight.installmentAmounts[this.flight.installmentAmounts.length - 1]
  }

  formatNumber(number: number) {
    return parseFloat(String(number)).toFixed(2).replace(".", ',')
  }

  getEconomy() {
    const card = this.getPaymentCard()
    const total = parseInt(card.installment) * parseFloat(card.installmentAmount);

    return this.formatNumber(total - parseFloat(this.flight.pix))
  }
}
