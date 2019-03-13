import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {ProductRepositoryService} from '../repository/product-repository.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: Product;
  mainIamge: string;
  constructor(private route: ActivatedRoute, private productRepository: ProductRepositoryService) {}

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productRepository.getOne(id)
    // .subscribe(response => console.log(response));
    .subscribe(response => {
      this.product = response.body;
      this.mainIamge = this.product.image_urls[0];
    });
  }
}
