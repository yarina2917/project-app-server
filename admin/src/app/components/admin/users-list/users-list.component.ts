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
  private userId;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private api: RequestsService
  ) { }

  ngOnInit(): void {
    this.api.get({url: '/users/get'})
      .subscribe((res: User[]) => this.usersData = res);
    this.userId = this.usersService.getLoginData('id');
  }

  public editUser(id): void {
    this.router.navigate([`user/${id}`]);
  }

  public deleteUser(id): void {
    this.api.delete({url: `/users/delete/${id}`})
      .subscribe(() => this.usersData = this.usersData.filter(user => user._id !== id));
  }
}
