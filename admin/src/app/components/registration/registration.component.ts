import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { RegistrationModel } from './registration.model';
import { roles } from '../admin/user';
import RegistrationForm from './registration.form';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public model: RegistrationModel;
  public form: RegistrationForm;
  public roles = roles;
  public registerError = '';

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    this.model = new RegistrationModel();
    this.form = new RegistrationForm(this.model);
  }

  ngOnInit() {}

  public register() {
    this.usersService.create(this.form.formGroup.value)
      .subscribe(
        res => this.router.navigate(['/login']),
        err => this.registerError = err.error
      );
  }

}
