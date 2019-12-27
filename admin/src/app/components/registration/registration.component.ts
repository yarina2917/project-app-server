import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { RequestsService } from '../../services/requests/requests.service';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';

import { RegistrationModel } from './registration.model';
import RegistrationForm from './registration.form';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public model: RegistrationModel;
  public form: RegistrationForm;
  public registerError = '';
  public createRequest$ = null;

  constructor(
    private router: Router,
    private api: RequestsService,
    private encryptDecryptService: EncryptDecryptService
  ) {
    this.model = new RegistrationModel();
    this.form = new RegistrationForm(this.model);
  }

  public ngOnInit() {}

  public register(): void {
    if (this.model.password !== this.model.confirmPassword) {
      this.registerError = 'Passwords are not equal';
    } else {
      this.createRequest$ = this.api.post({url: '/users/create', body: this.getUserData()})
        .subscribe(
          res => this.router.navigate(['/login']),
          err => this.registerError = err.error.message
        );
    }
  }

  public getUserData(): any {
    return {
      firstName: this.model.firstName,
      lastName: this.model.lastName,
      email: this.model.email,
      password: this.encryptDecryptService.encrypt(this.model.password)
    };
  }

  public ngOnDestroy(): void {
    if (this.createRequest$) {
      this.createRequest$.unsubscribe();
    }
  }

}
