import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../../../services/users/users.service';
import { RequestsService } from '../../../services/requests/requests.service';

@Component({
  selector: 'app-media-access',
  templateUrl: './media-access.component.html',
  styleUrls: ['./media-access.component.scss']
})
export class MediaAccessComponent implements OnInit {

  public fileData;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private api: RequestsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.api.get({url: `/files/get/${data.id}`})
        .subscribe(res => this.fileData = res);
    });
  }

}
