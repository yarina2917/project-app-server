import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { RequestsService } from '../../../services/requests/requests.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private router: Router,
    private api: RequestsService
  ) { }

  ngOnInit() {}

  public logout() {
    this.api.get({url: '/users/logout'})
      .subscribe(() => {
        this.usersService.clearLoginData();
        this.router.navigate(['/login']);
      });
  }
}
