import { Injectable } from '@angular/core';
import {AbstractRepository} from './abstract-repository';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Item} from '../../models/homepage';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomepageRepositoryService extends AbstractRepository {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getItems(): Observable<HttpResponse<Array<Item>>> {
    return this.http.get<HttpResponse<Array<Item>>>(`${this.baseUrl}/homepage/items`, this.httpOptions);
  }

  getBanners(): Observable<HttpResponse<Array<Item>>> {
    return this.http.get<HttpResponse<Array<Item>>>(`${this.baseUrl}/homepage/banners`, this.httpOptions);
  }
}
