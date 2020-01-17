import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { RequestsService } from '../../../services/requests/requests.service';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { MatDialog } from '@angular/material';

import { ModalInfoComponent } from '../../modal-info/modal-info.component';
import UserProfileForm from './user-profile.form';
import { UserProfileModel } from './user-profile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public form: UserProfileForm;
  public model: UserProfileModel;
  public userData = null;
  public roles = ['ADMIN', 'USER'];
  public requests$ = {
    getUser: null,
    updateUser: null
  };

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private api: RequestsService,
    private encryptDecryptService: EncryptDecryptService,
    public dialog: MatDialog
  ) {
    this.model = new UserProfileModel();
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      const id = data.id || this.usersService.getUserData('id');
      this.requests$.getUser = this.api.get({url: `/users/get-one/${id}`})
        .subscribe(res => {
          for (const key in res) {
            if (res[key]) {
              this.model[key] = key === 'password' ? this.encryptDecryptService.decrypt(res[key]) : res[key];
            }
          }
          this.userData = {...this.model};
          this.form = new UserProfileForm(this.model);
        });
    });
  }

  public update(): void {
    const newData = this.getUserData();
    if (Object.keys(newData).length) {
      this.requests$.updateUser = this.api.put({
        url: `/users/update/${this.model['_id']}`,
        body: newData
      })
        .subscribe(
          () => {
            this.userData = {...this.model};
            if (this.usersService.getUserData('id') === this.userData['_id']) {
              this.usersService.adminAccess = this.userData['role'] === 'ADMIN';
            }
            this.openDialog('Information was updated');
          },
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
        newData[key] = key === 'password' ? this.encryptDecryptService.encrypt(this.model[key]) : this.model[key];
      }
    }
    return newData;
  }

  public openDialog(message: string): void {
    this.dialog.open(ModalInfoComponent, {
      width: '400px',
      data: {message}
    });
  }

  public ngOnDestroy(): void {
    for (const item in this.requests$) {
      if (this.requests$[item]) {
        this.requests$[item].unsubscribe();
      }
    }
  }

}
