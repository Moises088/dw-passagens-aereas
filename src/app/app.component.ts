import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dw-passagens-aereas';

  loading: boolean = false;

  constructor(
    private readonly route: Router,
    private readonly _loading: LoadingService,
  ) { }

  ngOnInit() {
    this.listenToLoading();
    this.route.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        }
        else if (event instanceof NavigationEnd) {
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
        console.error(error);
      })
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0))
      .subscribe((loading: boolean) => {
        this.loading = loading;
      });
  }
}
