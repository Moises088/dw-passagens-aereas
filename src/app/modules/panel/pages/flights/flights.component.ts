import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from '../../services/flights.service';
import { lastValueFrom } from 'rxjs';
import { SearchContainerComponent } from '../../components/search-container/search-container.component';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {

  @ViewChild(SearchContainerComponent) searchContainerComponent!: SearchContainerComponent;

  flights: any = [];

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

      if (!origin || !destinations || !goDate || (!backDate && type == 'round_trip') || !passengers || !type) return

      const query = {
        origin,
        destinations,
        goDate,
        backDate,
        passengers,
        type
      };

      this.getFlights(query);

      this.searchContainerComponent.loadFilter(parseInt(origin), parseInt(destinations), goDate, backDate, passengers, type)
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
