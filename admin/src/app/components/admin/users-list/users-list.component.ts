import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { RequestsService } from '../../../services/requests/requests.service';

import { User } from '../../../models/user.interfaces';
import { ModalInfoComponent } from "../../modal-info/modal-info.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'actions'];
  public usersData: User[] = [];
  public requests$ = {
    getUser: null,
    deleteUser: null
  };

  constructor(
    private usersService: UsersService,
    private router: Router,
    private api: RequestsService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.requests$.getUser = this.api.get({url: '/users/get'})
      .subscribe((res: User[]) => this.usersData = res);
  }

  public editUser(id: string): void {
    this.router.navigate([`user/${id}`]);
  }

  public deleteUser(id: string): void {
    this.requests$.deleteUser = this.api.delete({url: `/users/delete/${id}`})
      .subscribe(() => {
        this.usersData = this.usersData.filter(user => user._id !== id)
        this.openDialog('User was deleted');
      })
  }

  public openDialog(message: string): void {
    this.dialog.open(ModalInfoComponent, {
      width: '400px',
      data: {message: message}
    });
  }

  public ngOnDestroy(): void {
    for (let item in this.requests$) {
      if (this.requests$[item]) {
        this.requests$[item].unsubscribe();
      }
    }
  }
}
