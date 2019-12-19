import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from './login.model';
import LoginForm from './login.form';
import { UsersService } from '../../services/users/users.service';

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
    private router: Router
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
    this.usersService.login(this.form.formGroup.value)
      .subscribe((res: any) => {
        this.usersService.setToken(res.token);
        this.router.navigate(['']);
      }, err => {
        this.loginError = err.error.message;
      });
  }

}
