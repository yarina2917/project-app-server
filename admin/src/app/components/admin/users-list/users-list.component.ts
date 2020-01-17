import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { RequestsService } from '../../../services/requests/requests.service';

import { User } from '../../../models/user.interfaces';
import { ModalInfoComponent } from '../../modal-info/modal-info.component';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() tableType: string;
  @Input() fileData: any;

  public displayedColumns;
  public usersListColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'actions'];
  public mediaAccessColumns: string[] = ['select', 'firstName', 'lastName', 'email', 'role'];
  public usersData: MatTableDataSource<User>;
  public selection = new SelectionModel<User>(true, []);
  public userId = '';
  public requests$ = {
    getUser: null,
    deleteUser: null,
    access: null
  };

  constructor(
    private usersService: UsersService,
    private router: Router,
    private api: RequestsService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.userId = this.usersService.getUserData('id');
    this.requests$.getUser = this.api.get({url: '/users/get'})
      .subscribe((res: User[]) => {
        this.usersData = new MatTableDataSource(res);
        this.usersData.paginator = this.paginator;
        this.usersData.sort = this.sort;
        if (this.tableType === 'mediaAccess') {
          this.selection = new SelectionModel<User>(true, res.filter(el => this.fileData.users.includes(el._id)));
          this.displayedColumns = this.mediaAccessColumns;
        } else {
          this.displayedColumns = this.usersListColumns
        }
      });
  }

  public editUser(id: string): void {
    this.router.navigate([`user/${id}`]);
  }

  public deleteUser({_id: id, firstName, lastName}): void {
    this.requests$.deleteUser = this.api.delete({url: `/users/delete/${id}`})
      .subscribe(() => {
        this.usersData.data = this.usersData.data.filter(user => user._id !== id);
        this.openDialog(`User ${firstName} ${lastName} was deleted`);
      });
  }

  public applyFilter(filterValue: string): void {
    this.usersData.filter = filterValue.trim().toLowerCase();

    if (this.usersData.paginator) {
      this.usersData.paginator.firstPage();
    }
  }

  public isAllSelected() {
    return this.selection.selected.length === this.usersData.data.length;
  }

  public masterToggle() {
    return this.isAllSelected() ?
      this.selection.clear() :
      this.usersData.data.forEach(row => this.selection.select(row));
  }

  public changeAccess() {
    this.requests$.access = this.api.post({
      url: '/files/change-access', body: {id: this.fileData._id, users: this.selection.selected}
    })
      .subscribe(() => this.openDialog('Access to file was updated'))
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
