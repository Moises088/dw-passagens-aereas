import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.url;
  private accessToken = '';

  constructor(private http: HttpClient) { }

  getHeaders() {
    const headers: Record<string, any> = {};
    if (this.accessToken) {
      headers['Authorization'] = 'Bearer ' + this.accessToken;
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

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  getAccessToken() {
    return this.accessToken;
  }

}
