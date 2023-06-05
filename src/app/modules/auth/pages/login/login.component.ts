import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async login() {
    const email = (<HTMLInputElement>document.getElementsByName('email')[0]).value;
    const password = (<HTMLInputElement>document.getElementsByName('password')[0]).value;

    if (!email || !password) {
      const errorMessage = document.querySelector('.error-message');
      if (!errorMessage) return
      errorMessage.textContent = 'Por favor, preencha todos os campos.';
      return;
    }

    try {
      const response = await lastValueFrom(this.authService.login({ email, password }));
      if (response?.accessToken) {
        this.authService.setUserData(response);
        this.router.navigate(['/'])
      }
    } catch (error) {
      const errorMessage = document.querySelector('.error-message');
      if (!errorMessage) return
      errorMessage.textContent = 'Credenciais inválidas. Por favor, verifique seus dados de login.';
    }
  }
}
