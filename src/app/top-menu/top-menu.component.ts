import { Component, OnInit } from '@angular/core';
import {Nav} from './Nav';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  public navs: Nav[];

  constructor() { }

  ngOnInit() {
    this.navs = [
      {title: 'Home', url: ''},
      {title: 'Products', url: '/products'},
      {title: 'Categories', url: '/repertoire'},
    ];
  }
}
