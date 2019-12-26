import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { RequestsService } from '../../../services/requests/requests.service';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { MatDialog } from '@angular/material';

import { ModalInfoComponent } from '../../modal-info/modal-info.component';
import UserProfileForm from './user-profile.form';
import { UserProfileModel } from './user-profile.model';
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
  public roles = roles;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private api: RequestsService,
    private encryptDecryptService: EncryptDecryptService,
    public dialog: MatDialog
  ) {
    this.model = new UserProfileModel;
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      const id = data.id || this.usersService.getUserData('id');
      this.api.get({url: `/users/get-one/${id}`})
        .subscribe(res => {
          for (const key in res) {
            this.model[key] = key === 'password' ? this.encryptDecryptService.decrypt(res[key]) : res[key];
          }
          this.userData = {...this.model};
          this.form = new UserProfileForm(this.model);
        });
    });
  }

  public update(): void {
    const newData = this.getUserData();
    if (Object.keys(newData).length) {
      this.api.put({url: `/users/update/${this.model['_id']}`, body: newData})
        .subscribe(
          () => this.openDialog('Information was updated'),
          (err) => this.openDialog(err.error.message)
        );
    } else {
      this.openDialog('Nothing to update');
    }
  }

  public getUserData(): any {
    const newData = {};
    for (const key in this.model) {
      if (this.model[key] !== this.userData[key]) {
        newData[key] = this.model[key];
      }
    }
    return newData;
  }

  public openDialog(message): void {
    this.dialog.open(ModalInfoComponent, {
      width: '400px',
      data: {message: message}
    });
  }


}
