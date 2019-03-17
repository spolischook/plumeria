import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ApiToken, LoginForm, User} from '../models/user';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {Observable, of} from 'rxjs';
import {share} from 'rxjs/operators';
import {SocialUser} from 'angular-6-social-login';
import {NgFlashMessageService} from 'ng-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public _user: User;
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

  constructor(private http: HttpClient, private ngFlashMessageService: NgFlashMessageService) {
  }

  set user(user: User) {
    this._user = user;
    localStorage.setItem('user', JSON.stringify(this._user));
  }

  get user(): User {
    return this._user || JSON.parse(localStorage.getItem('user')) as User;
  }

  loadUser(): Observable<HttpResponse<User>> {
    if (!this.apiToken) return null;

    this.httpOptions.headers = this.httpOptions.headers.set(
      'X-AUTH-TOKEN', this.apiToken.access_token
    );

    const response = this.http.get<HttpResponse<User>>(
      `${this.baseUrl}/users/self`,
      this.httpOptions
    );
    response.subscribe(apiResponse => this.user = apiResponse.body);

    return response;
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('apiToken');
    this.http.delete(
      `${this.baseUrl}/api/security_tokens`,
      this.httpOptions
    );

    this.httpOptions.headers = this.httpOptions.headers.delete('X-AUTH-TOKEN');
  }

  authenticate(snUser: SocialUser, socialPlatform: string): Observable<HttpResponse<ApiToken>> {
    const token = snUser.token;

    let result = this.http.post<HttpResponse<ApiToken>>(
      `${this.baseUrl}/login/${socialPlatform}`,
      `{"security_id": "${token}"}`,
      this.httpOptions
    );
    result = result.pipe(share());
    this.saveToken(result);

    return result;
  }

  formAuthenticate(loginForm: LoginForm): Observable<HttpResponse<ApiToken>> {
    let result = this.http.post<HttpResponse<ApiToken>>(
      `${this.baseUrl}/login`,
      loginForm,
      this.httpOptions
    );
    result = result.pipe(share());
    this.saveToken(result);

    return result;
  }

  saveToken(response: Observable<HttpResponse<ApiToken>>) {
    response.subscribe(
      apiResponse => {
        this.apiToken = apiResponse.body;
        localStorage.setItem('apiToken', JSON.stringify(this.apiToken));
      }
    );
  }
}
