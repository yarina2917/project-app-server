import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { RequestsService } from '../../../services/requests/requests.service';

import { RegistrationModel } from '../../registration/registration.model';
import { roles } from '../user';
import RegistrationForm from '../../registration/registration.form';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public model: RegistrationModel;
  public form: RegistrationForm;
  public updateInfo = '';
  public userInfo = null;
  public roles = roles;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private api: RequestsService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.api.get({url: `/users/get-one/${data.id}`})
        .subscribe(res => {
          this.userInfo = res;
          this.model = new RegistrationModel();
          this.form = new RegistrationForm(this.userInfo);
        });
    });
  }

  public update() {
    this.api.put({url: `/users/update/${this.userInfo._id}`, body: this.form.formGroup.value})
      .subscribe(
        () => this.updateInfo = 'Information was updated',
        (err) => this.updateInfo = err.error.message
      );
  }

}
