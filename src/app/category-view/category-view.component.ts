import {Component, Input, OnInit} from '@angular/core';
import {ProductRepositoryService} from '../repository/product-repository.service';
import {ProductList} from '../../models/product';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../models/category';
import {CategoryRepositoryService} from '../repository/category-repository.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {
  productList: ProductList;
  page: number;
  categoryId: number;
  category: Category;

  constructor(
    private categoryRepository: CategoryRepositoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.categoryId = +this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(param => this.categoryId = param.id);
    this.categoryRepository.getOne(this.categoryId).subscribe(response => this.category = response.body);
  }
}
