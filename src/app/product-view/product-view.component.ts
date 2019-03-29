import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {ProductRepositoryService} from '../repository/product-repository.service';
import {ActivatedRoute} from '@angular/router';
import {LoggerService} from '../logger.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: Product;
  inProgress: boolean;
  mainIamge: string;
  constructor(
    private route: ActivatedRoute,
    private productRepository: ProductRepositoryService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.inProgress = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.loadProduct(id);
    this.route.params.subscribe(routeParams => {
      this.loadProduct(routeParams.id);
    });
  }

  loadProduct(id) {
    this.product = undefined;
    this.productRepository.getOne(id)
    // .subscribe(response => console.log(response));
    .subscribe(
      response => {
        this.inProgress = false;
        this.product = response.body;
        this.mainIamge = this.product.image_urls[0];
      },
      err => {
        this.inProgress = false;
        this.logger.handleHttpError(err);
      }
    );
  }
}
