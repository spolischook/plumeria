import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCarouselModule, NgbPaginationModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFlashMessagesModule } from 'ng-flash-messages';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductViewComponent} from './product-view/product-view.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {ProductListComponent} from './product-list/product-list.component';
import {HomeComponent} from './home/home.component';
import {CategoryViewComponent} from './category-view/category-view.component';
import {UserTopMenuComponent} from './user-top-menu/user-top-menu.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular-6-social-login';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { TestComponent } from './test/test.component';
import { ProductViewWishlistComponent } from './product-view-wishlist/product-view-wishlist.component';

export function getAuthServiceConfigs() {
  return new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('330617747795405')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('1045838840565-skh6n1ppk050itl4k90e2rqo3paeq7kf.apps.googleusercontent.com')
      }
    ]
  );
}

@NgModule({
  declarations: [
    AppComponent,
    ProductViewComponent,
    TopMenuComponent,
    ProductListComponent,
    HomeComponent,
    CategoryViewComponent,
    UserTopMenuComponent,
    UserLoginFormComponent,
    TestComponent,
    ProductViewWishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbCarouselModule,
    FontAwesomeModule,
    NgbPopoverModule,
    SocialLoginModule,
    ReactiveFormsModule,
    FormsModule,
    NgFlashMessagesModule.forRoot()
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
