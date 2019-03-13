import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

export class AbstractRepository {
  protected baseUrl = environment.apiUrl;
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      store: 'us'
    }),
    observe: 'response' as 'body',
    params: new HttpParams()
  };

  constructor(protected http: HttpClient) {}
}
