import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ProductList} from '../models/product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      store: 'us'
    }),
    observe: 'response'
  };

  constructor(private http: HttpClient) {}

  getProducts(page: number, count: number): Observable<HttpResponse<ProductList>> {
    return this.http.get(
        `http://localhost:8002/api/products?pg=${page}&ps=${count}`,
        this.httpOptions
      )
    ;
  }
}
