import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private readonly router: Router
  ) { }

  async register() {
    const nome = (<HTMLInputElement>document.getElementById('nome-input')).value;
    const cpf = (<HTMLInputElement>document.getElementById('cpf-input')).value;
    const email = (<HTMLInputElement>document.getElementById('email-input')).value;
    const password = (<HTMLInputElement>document.getElementById('password-input')).value;

    if (!nome || !cpf || !email || !password) {
      const errorMessage = document.querySelector('.error-message');
      if (!errorMessage) return;
      errorMessage.textContent = 'Por favor, preencha todos os campos.';
      return;
    }

    try {
      const response = await lastValueFrom(this.authService.register({ name: nome, cpf, email, password }));
      if (response?.message) this.router.navigate(['/login'])
    } catch (error: any) {
      const errorMessage = document.querySelector('.error-message');
      if (!errorMessage) return;
      console.error(error?.error?.message)
      errorMessage.textContent = 'Erro ao cadastrar a conta. Por favor, verifique os dados e tente novamente. ' + error?.error?.message ?? '';
    }
  }
}
