import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ApiToken} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  public user;
  public apiToken: ApiToken;
  protected baseUrl = environment.apiUrl;
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      store: 'us'
    }),
    observe: 'response' as 'body',
    params: new HttpParams()
  };
  constructor(private http: HttpClient) { }

  getUser() {
    if (!this.apiToken) return null;

  }

  fbAuthenticate(token: string) {
    console.log(`starting authenticate by api using "${token}" token`);
    this.http.post<HttpResponse<ApiToken>>(
      `${this.baseUrl}/login/facebook`,
      `{"security_id": "${token}"}`,
      this.httpOptions
    ).subscribe(
      response => this.apiToken = response.body
    );
    console.log('finish authenticate by api');
  }
}
