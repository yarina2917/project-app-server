import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { RequestsService } from '../../../services/requests/requests.service';

import { User } from '../user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'actions'];
  public usersData: User[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private api: RequestsService
  ) { }

  public ngOnInit(): void {
    this.api.get({url: '/users/get'})
      .subscribe((res: User[]) => this.usersData = res);
  }

  public editUser(id: string): void {
    this.router.navigate([`user/${id}`]);
  }

  public deleteUser(id: string): void {
    this.api.delete({url: `/users/delete/${id}`})
      .subscribe(() => this.usersData = this.usersData.filter(user => user._id !== id));
  }
}
