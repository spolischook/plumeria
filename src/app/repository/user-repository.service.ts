import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpParams, HttpResponse} from '@angular/common/http';
import {ProductList} from '../../models/product';
import {AbstractRepository} from './abstract-repository';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService extends AbstractRepository {
  getList(): Observable<HttpResponse<ProductList>> {

    return this.http.get<HttpResponse<ProductList>>(
      `${this.baseUrl}/users/self/wishlist/default/items`,
      this.httpOptions
    );
  }
}
