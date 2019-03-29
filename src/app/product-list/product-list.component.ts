import {Component, Input, OnInit} from '@angular/core';
import {ProductList} from '../../models/product';
import {HttpResponse} from '@angular/common/http';
import {ProductRepositoryService} from '../repository/product-repository.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoggerService} from '../logger.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: ProductList;
  @Input() public categoryId: number;
  @Input() public ps: number;
  page: number;
  inProgress: boolean;

  constructor(
    private productRepository: ProductRepositoryService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.inProgress = true;
    this.route.queryParams.subscribe(params => this.loadProducts(params.page));
    this.page = +this.route.snapshot.queryParamMap.get('page') || 1;
    this.ps = +this.route.snapshot.queryParamMap.get('ps') || 20;
    this.loadProducts(this.page);
  }

  goToPage(page: number) {
    const params = { page };
    this.page = page;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  loadProducts(page) {
    this.productRepository.getList(page, this.ps, [this.categoryId])
      // .subscribe(response => console.log(response));
      .subscribe(
        response => {
          this.inProgress = false;
          this.productList = response.body;
        },
        err => {
          this.inProgress = false;
          this.logger.handleHttpError(err);
        }
      );
  }
}
