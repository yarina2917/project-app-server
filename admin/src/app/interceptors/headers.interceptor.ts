import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { UsersService } from '../services/users/users.service';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private userService: UsersService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = {};

    if (request.url.includes('login')) {
      headers = {
        Authorization: `Bearer ${this.userService.authToken()}`,
      };
    } else if (!request.url.includes('create')) {
      headers = {
        'x-api-key': this.userService.getToken(),
      };
    }

    request = request.clone({
      setHeaders: headers
    });

    return next.handle(request);
  }
}
