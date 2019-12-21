import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userData = {};
  public access = {
    admin: false,
    superAdmin: false
  }

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
    if (this.userData['role']) {
      this.access.admin = this.userData['role'].toLowerCase().includes('admin');
      this.access.superAdmin = this.userData['role'] === 'Super admin';
    }
  }

  public getLoginData(prop?) {
    return prop ? this.userData[prop] : this.userData;
  }

  public clearLoginData() {
    this.userData = {};
    this.cookieService.delete('token');
  }

}
