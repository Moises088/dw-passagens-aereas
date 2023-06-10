import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(
    private readonly api: ApiService
  ) { }

  autocomplete(q: string) {
    return this.api.get("place/autocomplete", { q })
  }

  placeId(id: number) {
    return this.api.get("place/" + id)
  }
}
