import { Component } from '@angular/core';
import { Router } from '@angular/router';

import 'jquery';
import 'jqueryui';
// import '../../../assets/jquery-ui-i18n.js';

declare var $: any;

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.css']
})
export class SearchContainerComponent {

  origin!: string;
  destinations!: string;
  goDate: string | undefined;
  backDate: string | undefined;
  passengersCount: number = 1;
  passengersOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formErrors: { [key: string]: boolean } = {};

  constructor(private readonly router: Router) { }

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

    if (!this.origin) {
      this.formErrors['origin'] = true;
    }

    if (!this.destinations) {
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
      origin: this.origin,
      destinations: this.destinations,
      goDate: this.goDate,
      backDate: this.backDate,
      passengers: this.passengersCount
    };

    this.router.navigate(['/voos'], { queryParams });
  }
}
