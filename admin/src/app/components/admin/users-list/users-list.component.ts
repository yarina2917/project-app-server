import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../../services/users/users.service";
import { Router } from "@angular/router";
import { User } from "../user";

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.get()
      .subscribe((res: User[]) => this.usersData = res);
  }

  public editUser(id): void {
    this.router.navigate([`user/${id}`]);
  }

  public deleteUser(id): void {
    this.usersService.delete(id)
      .subscribe(() => this.usersData = this.usersData.filter(user => user._id !== id));
  }
}
