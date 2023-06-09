import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Ticket } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private api: ApiService) { }

  getFlights(query: any) {
    return this.api.get('flight/getall', query)
  }

  getFlightId(id: string, passengers: string) {
    return this.api.get('flight/' + id + "/" + passengers)
  }

  buyTicket(data: any) {
    return this.api.post('flight/buy', data)
  }

  getTickets() {
    return this.api.get<Ticket[]>('flight/tickets')
  }
}
