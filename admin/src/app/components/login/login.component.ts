import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users/users.service';
import { RequestsService } from '../../services/requests/requests.service';

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
    private api: RequestsService
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
    this.usersService.saveLoginData(this.form.formGroup.value);
    this.api.get({url: '/users/login'})
      .subscribe((res: any) => {
        this.usersService.setToken(res.token);
        this.router.navigate(['']);
      }, err => {
        this.loginError = err.error.message;
      });
  }

}
