import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from '../../services/flights.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {

  flights: any = []

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly flightsService: FlightsService
  ) { }

  ngAfterViewInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const origin = params.get('origin');
      const destinations = params.get('destinations');
      const goDate = params.get('goDate');
      const backDate = params.get('backDate');
      const passengers = params.get('passengers');
      const type = params.get('type');

      const query = {
        origin,
        destinations,
        goDate,
        backDate,
        passengers,
        type
      };

      this.getFlights(query);
    });
  }

  async getFlights(query: any) {
    try {
      console.log(query);
      const flights = await lastValueFrom(this.flightsService.getFlights(query));
      console.log(flights);
      this.flights = flights;
    } catch (error) {
      // Trate o erro aqui
    }
  }
}
