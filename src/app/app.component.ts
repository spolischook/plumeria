import {Component, OnInit} from '@angular/core';
import {ProductRepositoryService} from './product-repository.service';
import {ProductList} from '../models/product';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my app!!';
  productList: ProductList;
  response: HttpResponse<ProductList>;

  constructor(private productRepository: ProductRepositoryService) {}

  ngOnInit(): void {
    this.productRepository.getProducts(1, 20)
      // .subscribe(response => console.log(response));
      .subscribe(response => this.productList = response.body);
  }
}
