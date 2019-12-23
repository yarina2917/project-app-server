import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { RequestsService } from './services/requests/requests.service';
import { UsersService } from "./services/users/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public route;

  constructor(
    private router: Router,
    private api: RequestsService,
    private userService: UsersService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route = event.url;
      }
    });
  }

  public ngOnInit(): void {
    if (this.userService.loggedIn()) {
      this.api.get({url: '/users/get-one'})
        .subscribe((res) => {
          this.userService.saveUserData({id: res._id, role: res.role})
        })
    }
  }

}
