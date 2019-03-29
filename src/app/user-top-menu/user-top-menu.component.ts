import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../user.service';
import {faSignInAlt, faUser, faHeart} from '@fortawesome/free-solid-svg-icons';
import {User} from '../../models/user';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import {HttpErrorResponse} from '@angular/common/http';
import {ProductList} from '../../models/product';
import {LoggerService} from '../logger.service';

declare var FB: any;

@Component({
  selector: 'app-user-top-menu',
  templateUrl: './user-top-menu.component.html',
  styleUrls: ['./user-top-menu.component.scss']
})
export class UserTopMenuComponent implements OnInit {
  user: User;
  userIco = faUser;
  singInIco = faSignInAlt;
  heartIco = faHeart;
  inProgress: boolean;
  wishList: ProductList;

  constructor(
    private userService: UserService,
    protected localStorage: LocalStorage,
    private socialAuthService: AuthService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.user = this.userService.user;
    this.inProgress = false;
  }

  formLoginEvent(user: User) {
    this.user = user;
  }

  getUser() {
    return this.userService.user;
  }

  getWishList() {
    this.inProgress = true;
    this.wishList = undefined;
    this.userService.getWishList().subscribe(
      response => {
        this.inProgress = false;
        this.wishList = response.body;
      },
      err => {
        this.inProgress = false;
        this.logger.handleHttpError(err);
      }
    );
  }

  login(event, socialPlatform: string) {
    event.preventDefault();
    this.inProgress = true;
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    if (socialPlatform === 'google') socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.userService.authenticate(userData, socialPlatform).subscribe(
          response => {
            this.userService.loadUser().subscribe(
              response2 => {
                this.user = this.userService.user;
                this.inProgress = false;
              },
              err => {
                this.inProgress = false;
                this.logger.handleHttpError(err);
              }
            );
          },
          err => {
            this.inProgress = false;
            this.logger.handleHttpError(err);
          }
        );
      },
      err => {
        this.inProgress = false;
        this.logger.handleHttpError(err);
      }
    );
  }

  logout() {
    this.userService.logout();
    this.user = null;
  }
}
