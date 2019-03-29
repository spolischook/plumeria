import { Injectable } from '@angular/core';
import {NgFlashMessageService} from 'ng-flash-messages';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private ngFlashMessageService: NgFlashMessageService) { }

  public handleHttpError(err: HttpErrorResponse) {
    this.ngFlashMessageService.showFlashMessage({
      messages: [err.message],
      dismissible: true,
      timeout: false,
      type: 'danger'
    });
  }
}
