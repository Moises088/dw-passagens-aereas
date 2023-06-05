import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  userData: any;

  showButtonLogin: boolean = true;
  showButtonRestrict: string[] = ['/login', '/cadastrese'];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.changeRouter(event.url);
      }
    });

    this.getUserData()
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

  async getUserData() {
    const getUserData = await this.authService.getUserData();
    console.log(getUserData?.name)
    if (getUserData?.name) {
      this.userData = getUserData;
    }
  }

  async account() {
    
  }
}
