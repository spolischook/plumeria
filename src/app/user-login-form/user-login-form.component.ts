import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../user.service';
import {User} from '../../models/user';
import {NgFlashMessageService} from 'ng-flash-messages';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  inProgress: boolean;
  @Output() userFormLogin: EventEmitter<User> = new EventEmitter();

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private userService: UserService, private ngFlashMessageService: NgFlashMessageService) {
  }

  ngOnInit() {
    this.inProgress = false;
  }

  onSubmit() {
    console.warn(this.loginForm.value);
    this.inProgress = true;

    this.userService.formAuthenticate(this.loginForm.value).subscribe(
      response => {
        this.userService.loadUser().subscribe(
          response2 => {
            this.userFormLogin.emit(this.userService.user);
            console.log(this.userService.user);
          },
          err => {
            this.inProgress = false;
          },
        );
      },
      err => {
        this.inProgress = false;
      },
    );
  }
}
