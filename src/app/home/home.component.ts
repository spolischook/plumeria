import { Component, OnInit } from '@angular/core';
import {Item} from '../../models/homepage';
import {HomepageRepositoryService} from '../repository/homepage-repository.service';
import {LoggerService} from '../logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Array<Item>;
  banners: Array<Item>;
  constructor(private homepageRepository: HomepageRepositoryService, private logger: LoggerService) {}

  ngOnInit() {
    this.homepageRepository.getItems()
      .subscribe(
        response => this.items = response.body,
        err => this.logger.handleHttpError(err)
      );
    this.homepageRepository.getBanners()
      .subscribe(
        response => this.banners = response.body,
        err => this.logger.handleHttpError(err)
      );
  }
}
