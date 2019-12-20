import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userData = {};

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  public getToken(): any {
    return this.cookieService.get('token');
  }

  public setToken(token): void {
    this.cookieService.set('token', token);
  }

  public loggedIn(): boolean {
    return !!this.getToken();
  }

  public authToken() {
    return btoa(`${this.userData['email']} ${this.userData['password']}`);
  }

  public saveLoginData(data) {
    this.userData = {...data};
  }

  public clearLoginData() {
    this.userData = {};
    this.cookieService.delete('token');
  }

}
