import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = environment.url;
  private userData = { name: '', email: '', accessToken: '' };

  constructor(private readonly http: HttpClient) { }

  getHeaders() {
    const headers: Record<string, any> = {};
    if (this.userData.accessToken.length) {
      headers['Authorization'] = 'Bearer ' + this.userData.accessToken;
    }

    headers['Access-Control-Allow-Origin'] = '*';
    headers['X-Requested-With'] = 'XMLHttpRequest';

    return headers;
  }

  post<T>(endPoint: string, data: any = {}, loading: boolean = true) {
    const url = this.baseUrl + endPoint;
    return this.http.post<T>(url, data, {
      headers: this.getHeaders(),
    });
  }

  put<T>(endPoint: string, data = {}) {
    const url = this.baseUrl + endPoint;
    return this.http.put<T>(url, data, {
      headers: this.getHeaders(),
    });
  }

  get<T>(endPoint: string, params = {}) {
    const url = this.baseUrl + endPoint;
    const headers = this.getHeaders();
    // console.log(headers)
    return this.http.get<T>(url, {
      params,
      headers,
    });
  }

  delete<T>(endPoint: string, data = {}) {
    const url = this.baseUrl + endPoint;
    return this.http.request<T>("delete", url, {
      body: data,
      headers: this.getHeaders()
    })
  }

  async setUserData(userData: any) {
    await localStorage.setItem('userData', JSON.stringify(userData))
    this.userData = userData;
  }

  async getUserData() {
    if (!this.userData?.accessToken?.length) {
      const userDataStr = await localStorage.getItem('userData');
      if (!userDataStr) return null;

      const userData = JSON.parse(userDataStr)
      if (!userData || !userData?.accessToken) return null;

      this.userData = userData;
    }

    try {
      await lastValueFrom(this.get("user/verify/token"))
      return this.userData;
    } catch (error) {
      await localStorage.removeItem("userData")
      this.userData = { name: '', email: '', accessToken: '' };
      return null
    }

  }

}
