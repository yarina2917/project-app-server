import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { RequestsService } from '../../../services/requests/requests.service';

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
  public updateInfo = '';
  public roles = roles;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private api: RequestsService
  ) {
    this.model = new UserProfileModel;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.api.get({url: `/users/get-one/${data.id}`})
        .subscribe(res => {
          for (const key in res) {
            this.model[key] = res[key];
          }
          this.form = new UserProfileForm(this.model);
        });
    });
  }

  public update() {
    if (this.model.password !== this.model.confirmPassword) {
      this.updateInfo = 'Passwords are not equal'
    } else {
      this.api.put({url: `/users/update/${this.model['_id']}`, body: this.form.formGroup.value})
        .subscribe(
          () => this.updateInfo = 'Information was updated',
          (err) => this.updateInfo = err.error.message
        );
    }
  }


}
