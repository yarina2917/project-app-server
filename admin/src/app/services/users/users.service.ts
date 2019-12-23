import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userData = {};
  public adminAccess = false;

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

  public saveUserData(data) {
    this.userData = {...data};
    this.adminAccess = this.userData['role'] === 'Admin';
  }

  public getUserData(prop?) {
    return prop ? this.userData[prop] : this.userData;
  }

  public clearLoginData() {
    this.userData = {};
    this.cookieService.delete('token');
  }

}
