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

    if (!request.url.includes('create') && !request.url.includes('login')) {
      request = request.clone({
        setHeaders: {
          'x-api-key': this.userService.getToken(),
        }
      });
    }

    return next.handle(request);
  }
}
