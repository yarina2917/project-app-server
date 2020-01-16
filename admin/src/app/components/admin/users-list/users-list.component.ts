import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { RequestsService } from '../../../services/requests/requests.service';

import { User } from '../../../models/user.interfaces';
import { ModalInfoComponent } from '../../modal-info/modal-info.component';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'actions'];
  public usersData: MatTableDataSource<User>;
  public userId = '';
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
    this.userId = this.usersService.getUserData('id');
    this.requests$.getUser = this.api.get({url: '/users/get'})
      .subscribe((res: User[]) => {
        this.usersData = new MatTableDataSource(res);
        this.usersData.paginator = this.paginator;
        this.usersData.sort = this.sort;
      });
  }

  public editUser(id: string): void {
    this.router.navigate([`user/${id}`]);
  }

  public deleteUser({id, firstName, lastName}): void {
    this.requests$.deleteUser = this.api.delete({url: `/users/delete/${id}`})
      .subscribe(() => {
        this.usersData.data = this.usersData.data.filter(user => user._id !== id);
        this.openDialog(`User ${firstName} ${lastName} was deleted`);
      });
  }

  public openDialog(message: string): void {
    this.dialog.open(ModalInfoComponent, {
      width: '400px',
      data: {message}
    });
  }

  public applyFilter(filterValue: string): void {
    this.usersData.filter = filterValue.trim().toLowerCase();

    if (this.usersData.paginator) {
      this.usersData.paginator.firstPage();
    }
  }

  public ngOnDestroy(): void {
    for (const item in this.requests$) {
      if (this.requests$[item]) {
        this.requests$[item].unsubscribe();
      }
    }
  }
}
