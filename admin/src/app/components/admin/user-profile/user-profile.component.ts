import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { RequestsService } from '../../../services/requests/requests.service';

import UserProfileForm from './user-profile.form';
import UserPasswordForm from './user-password.form';
import { UserPasswordModel } from './user-profile.model';

import { roles } from '../user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public profileForm: UserProfileForm;
  public passwordForm: UserPasswordForm;
  public userData = null;
  public updateInfo = {
    profile: '',
    password: ''
  };
  public roles = {
    data: roles,
    default: 'User'
  };

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private api: RequestsService
  ) {
    this.passwordForm = new UserPasswordForm(new UserPasswordModel());
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.api.get({url: `/users/get-one/${data.id}`})
        .subscribe(res => {
          this.userData = res;
          this.profileForm = new UserProfileForm(this.userData);
          this.roles.default = res.role;
        });
    });
  }

  public updateProfile() {
    this.api.put({url: `/users/update/${this.userData._id}`, body: this.profileForm.formGroup.value})
      .subscribe(
        () => this.updateInfo.profile = 'Information was updated',
        (err) => this.updateInfo.profile = err.error.message
      );
  }

  public updatePassword() {
    this.api.put({url: `/users/update-password/${this.userData._id}`, body: {password: this.passwordForm.formGroup.value.password}})
      .subscribe(
        () => this.updateInfo.password = 'Password was updated',
        (err) => this.updateInfo.password = err.error.message
      );
  }

}
