import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbCarouselModule, NgbPaginationModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductViewComponent } from './product-view/product-view.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ProductViewComponent,
    TopMenuComponent,
    ProductListComponent,
    HomeComponent,
    CategoryViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbCarouselModule,
    FontAwesomeModule,
    NgbPopoverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
