import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Product, ProductList} from '../../models/product';
import {Observable} from 'rxjs';
import {AbstractRepository} from './abstract-repository';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryService extends AbstractRepository {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getList(page = 1, count = 10, categories = []): Observable<HttpResponse<ProductList>> {
    this.httpOptions.params = new HttpParams()
      .set('pg', page.toString())
      .set('ps', count.toString())
    ;

    categories.forEach((catId: number) => {
      if (!catId) return;
      this.httpOptions.params = this.httpOptions.params.append(`ct[]`, catId.toString());
    });

    return this.http.get<HttpResponse<ProductList>>(
      `${this.baseUrl}/products`,
      this.httpOptions
    );
  }

  getOne(id: number): Observable<HttpResponse<Product>> {
    return this.http.get<HttpResponse<Product>>(
      `${this.baseUrl}/products/${id}`,
      this.httpOptions
    );
  }
}
