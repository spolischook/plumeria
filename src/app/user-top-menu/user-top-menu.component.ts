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
import {NgFlashMessageService} from 'ng-flash-messages';
import {HttpErrorResponse} from '@angular/common/http';

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

  constructor(
    private userService: UserService,
    protected localStorage: LocalStorage,
    private socialAuthService: AuthService,
    private ngFlashMessageService: NgFlashMessageService
  ) {
  }

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
              err => this.handleLoginError(err)
            );
          },
          err => this.handleLoginError(err)
        );
      },
      err => this.handleLoginError(err)
    );
  }

  private handleLoginError(err: HttpErrorResponse) {
    this.inProgress = false;
    this.ngFlashMessageService.showFlashMessage({
      messages: [err.message],
      dismissible: true,
      timeout: false,
      type: 'danger'
    });
  }

  logout() {
    this.userService.logout();
    this.user = null;
  }
}
