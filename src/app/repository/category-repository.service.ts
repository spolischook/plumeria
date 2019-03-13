import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AbstractRepository} from './abstract-repository';
import {Category} from '../../models/category';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryRepositoryService extends AbstractRepository {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getOne(id: number): Observable<HttpResponse<Category>> {
    return this.http.get<HttpResponse<Category>>(
      `${this.baseUrl}/categories/${id}`,
      this.httpOptions
    );
  }
}
