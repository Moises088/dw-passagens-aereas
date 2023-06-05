import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  showButtonLogin: boolean = true;
  showButtonRestrict: string[] = ['/login', '/cadastrese'];

  constructor(
    private readonly router: Router
  ) { }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.changeRouter(event.url);
      }
    });
  }

  login() {
    this.router.navigate(['/login'])
  }

  home() {
    this.router.navigate(['/'])
  }

  changeRouter(url: string) {
    if (this.showButtonRestrict.includes(url)) {
      this.showButtonLogin = false;
    } else {
      this.showButtonLogin = true;
    }
  }
}
