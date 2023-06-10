import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountGuard {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const userData = await this.authService.getUserData();

    if (userData !== null) {
      return true;
    } else {
      // Navegar para a página de login ou qualquer outra página desejada
      this.router.navigate(['/']);
      return false;
    }
  }
}
