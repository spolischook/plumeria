import { Component, OnInit } from '@angular/core';
import {Nav} from './Nav';
import {faCoffee, faSignInAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import {AuthenticatorService} from '../authenticator.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  public navs: Nav[];
  user;
  userIco = faUser;
  singInIco = faSignInAlt;
  FB;

  constructor(public authenticator: AuthenticatorService) { }

  ngOnInit() {
    this.navs = [
      {title: 'Home', url: ''},
      {title: 'Products', url: '/products'},
      {title: 'Categories', url: '/repertoire'},
    ];

    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '330617747795405',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
       let js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = 'https://connect.facebook.net/en_US/sdk.js';
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  submitLogin(event){
    event.preventDefault();
    console.log('submit login to facebook');
    // FB.login();
    FB.login((response) =>
      {
        console.log('submitLogin', response);
        if (response.authResponse) {
          this.authenticator.fbAuthenticate(response.authResponse.accessToken);
          console.log('auth success');
        } else {
          console.log('User login failed');
        }
      });

  }
}
