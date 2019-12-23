import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users/users.service';
import { RequestsService } from '../../services/requests/requests.service';
import { EncryptDecryptService } from "../../services/encrypt-decrypt.service";

import { LoginModel } from './login.model';
import LoginForm from './login.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public model: LoginModel;
  public form: LoginForm;
  public loginError = '';

  constructor(
    private usersService: UsersService,
    private router: Router,
    private api: RequestsService,
    private encryptDecryptService: EncryptDecryptService
  ) {
    this.model = new LoginModel();
    this.form = new LoginForm(this.model);
  }

  ngOnInit() {
    if (this.usersService.loggedIn()) {
      this.router.navigate(['']);
    }
  }

  public login() {
    this.api.post({url: '/users/login', body: this.getUserData()})
      .subscribe((res: any) => {
        this.usersService.setToken(res.apiKey);
        this.usersService.saveUserData({id: res._id, role: res.role});
        this.router.navigate(['']);
      }, err => this.loginError = err.error.message);
  }

  public getUserData() {
    return {
      email: this.model.email,
      password: this.encryptDecryptService.encrypt(this.model.password)
    }
  }

}
