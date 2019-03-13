import {Component} from '@angular/core';
import {ProductRepositoryService} from './repository/product-repository.service';
import {ProductList} from '../models/product';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
