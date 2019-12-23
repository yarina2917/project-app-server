import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { RequestsService } from '../../../services/requests/requests.service';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';

import UserProfileForm from './user-profile.form';
import { UserProfileModel } from "./user-profile.model";
import { roles } from '../user';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public form: UserProfileForm;
  public model: UserProfileModel;
  public userData = null;
  public updateInfo = '';
  public roles = roles;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private api: RequestsService,
    private encryptDecryptService: EncryptDecryptService
  ) {
    this.model = new UserProfileModel;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.api.get({url: `/users/get-one/${data.id}`})
        .subscribe(res => {
          for (const key in res) {
            this.model[key] = key === 'password' ? this.encryptDecryptService.decrypt(res[key]) : res[key];
          }
          this.userData = {...this.model};
          this.form = new UserProfileForm(this.model);
        });
    });
  }

  public update() {
    if (this.model.password !== this.model.confirmPassword) {
      this.updateInfo = 'Passwords are not equal';
    } else {
      const newData = this.getUserData();
      if (Object.keys(newData).length) {
        this.api.put({url: `/users/update/${this.model['_id']}`, body: newData})
          .subscribe(
            () => this.updateInfo = 'Information was updated',
            (err) => this.updateInfo = err.error.message
          );
      } else {
        this.updateInfo = 'Nothing to update';
      }
    }
  }

  public getUserData() {
    const newData = {};
    for (const key in this.model) {
      if (this.model[key] !== this.userData[key] && key !== 'confirmPassword') {
        newData[key] = this.model[key];
      }
    }
    return newData
  }


}
