import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  public get() {
    return this.http.get(`${this.apiUrl}/get`);
  }

  public getOne(id) {
    return this.http.get(`${this.apiUrl}/get-one/${id}`);
  }

  public login(body) {
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  public create(body) {
    return this.http.post(`${this.apiUrl}/create`, body);
  }

  public update(body, id) {
    return this.http.put(`${this.apiUrl}/update/${id}`, body);
  }

  public delete(id) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  public logout(): void {
    this.cookieService.delete('token');
  }

  public getToken(): any {
    return this.cookieService.get('token');
  }

  public setToken(id): void {
    this.cookieService.set('token', id);
  }

  public loggedIn(): boolean {
    return !!this.getToken();
  }
}
