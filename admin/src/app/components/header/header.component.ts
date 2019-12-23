import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UsersService } from "../../services/users/users.service";
import { RequestsService } from "../../services/requests/requests.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private router: Router,
    private api: RequestsService
  ) { }

  ngOnInit() {}

  public profile() {
    this.router.navigate([`/user/${this.usersService.getUserData('id')}`]);
  }

  public logout() {
    this.api.get({url: '/users/logout'})
      .subscribe(() => {
        this.usersService.clearLoginData();
        this.router.navigate(['/login']);
      });
  }

}
