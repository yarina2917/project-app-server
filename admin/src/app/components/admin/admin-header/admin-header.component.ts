import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../../services/users/users.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {}

  public logout() {
    this.usersService.logout(this.usersService.getToken())
      .subscribe(res => console.log(res))
    this.router.navigate(['/login']);
  }
}
