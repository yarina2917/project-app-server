import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { UsersService } from '../../../services/users/users.service';
import { RequestsService } from '../../../services/requests/requests.service';

import { User } from '../../../models/user.interfaces';
import { ModalInfoComponent } from '../../modal-info/modal-info.component';
import { SelectionModel } from '@angular/cdk/collections';
import { UserListModel } from './user-list.model';

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
  @Input() set users(data: any) {
    this.setTableData(data);
  }

  public model: UserListModel;
  public usersData: MatTableDataSource<User>;
  public selection;
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
  ) {
    this.model = new UserListModel();
  }

  public ngOnInit(): void {
    this.model.userId = this.usersService.getUserData('id');
    this.requests$.getUser = this.api.get({url: '/users/get'})
      .subscribe((res: User[]) => {
        if (this.tableType === 'mediaAccess') {
          this.setTableData(res.filter(el => el.role === 'USER'));
          this.selection = new SelectionModel<User>(true, res.filter(el => this.fileData.users.includes(el._id)));
          this.model.displayedColumns = this.model.mediaAccessColumns;
        } else {
          this.setTableData(res);
          this.model.displayedColumns = this.model.usersListColumns;
        }
      });
  }

  public setTableData(data) {
    this.usersData = new MatTableDataSource(data);
    this.usersData.paginator = this.paginator;
    this.usersData.sort = this.sort;
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

  public isAllSelected(): boolean {
    return this.selection.selected.length === this.usersData.data.length;
  }

  public masterToggle() {
    return this.isAllSelected() ?
      this.selection.clear() :
      this.usersData.data.forEach(row => this.selection.select(row));
  }

  public changeAccess(): void {
    this.requests$.access = this.api.post({
      url: '/files/change-access', body: {id: this.fileData._id, users: this.selection.selected}
    })
      .subscribe(() => this.openDialog('Access to file was updated'));
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
