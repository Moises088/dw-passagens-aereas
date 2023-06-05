import { Component } from '@angular/core';
import { Router } from '@angular/router';

import 'jquery';
import 'jqueryui';
import { AutocompleteService } from '../../services/autocomplete.service';
import { lastValueFrom } from 'rxjs';
// import '../../../assets/jquery-ui-i18n.js';

declare var $: any;

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.css']
})
export class SearchContainerComponent {

  origin!: { id: number, address: string, latitude: string, longitude: string };
  destinations!: { id: number, address: string, latitude: string, longitude: string };
  goDate: string | undefined;
  backDate: string | undefined;
  type: 'round_trip' | 'one_way' = 'round_trip';
  passengersCount: number = 1;
  passengersOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formErrors: { [key: string]: boolean } = {};

  keyword = 'address';
  data = [];

  constructor(
    private readonly router: Router,
    private readonly autocompleteService: AutocompleteService
  ) { }

  ngAfterViewInit() {
    $('#date-volta-input').datepicker({
      onSelect: (dateText: string) => {
        this.backDate = dateText;
      }
    });
    $('#date-ida-input').datepicker({
      onSelect: (dateText: string) => {
        this.goDate = dateText;
      }
    });
    $.datepicker.setDefaults($.datepicker.regional['pt-BR']);
  }

  openDatePicker(id: string) {
    $('#' + id).datepicker('show');
  }

  validateForm() {
    this.formErrors = {};

    if (!this.origin?.id) {
      this.formErrors['origin'] = true;
    }

    if (!this.destinations?.id) {
      this.formErrors['destinations'] = true;
    }

    if (!this.goDate) {
      this.formErrors['goDate'] = true;
    }

    if (!this.backDate) {
      this.formErrors['backDate'] = true;
    }

    if (this.goDate && this.backDate && this.goDate > this.backDate) {
      this.formErrors['dateError'] = true;
    }

    if (Object.keys(this.formErrors).length === 0) {
      this.navigateToFlights();
    }
  }

  navigateToFlights() {
    const queryParams = {
      origin: this.origin.id,
      destinations: this.destinations.id,
      goDate: this.goDate,
      backDate: this.backDate,
      passengers: this.passengersCount,
      type: this.type
    };

    this.router.navigate(['/voos'], { queryParams });
  }

  selectEvent(item: any, type: 'origin' | 'destinations') {
    this[type] = item;
    this.data = [];
  }

  async onChangeSearch(val: string) {
    if (val.length >= 3) {
      const response: any = await lastValueFrom(this.autocompleteService.autocomplete(val));
      this.data = response;
    } else {
      this.data = [];
    }
  }

  changeType(type: 'round_trip' | 'one_way') {
    this.type = type;
  }
}
