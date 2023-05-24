import { Component } from '@angular/core';

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

  goDate: any;
  backDate: any;

  passengersCount: number = 1;
  passengersOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngAfterViewInit() {
    $('#date-volta-input').datepicker();
    $('#date-ida-input').datepicker();
    $.datepicker.setDefaults($.datepicker.regional['pt-BR']);
  }

  openDatePicker(id: string) {
    $('#' + id).datepicker('show');
  }
}
