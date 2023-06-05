import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: ApiService
  ) { }

  login(credentials: { email: string, password: string }) {
    return this.api.post<any>('user/login', credentials);
  }

  register(userData: { name: string, email: string, password: string }) {
    return this.api.post<any>('user/register', userData);
  }
}
