import {Component, OnDestroy, OnInit} from '@angular/core';

import roughViz from 'rough-viz';

import { RequestsService } from '../../services/requests/requests.service';
import { User } from '../../models/user.interfaces';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit, OnDestroy {

  public getUserRequest$ = null;
  public graphicData = {
    labels: ['First name', 'Last name', 'Email'],
    values: []
  };

  constructor(
    private api: RequestsService,
    private usersService: UsersService
  ) { }

  public ngOnInit(): void {
    this.getUserRequest$ = this.api.get({url: `/users/get-one/${this.usersService.getUserData('id')}`})
      .subscribe(res => {
        this.graphicData.values = [res.firstName.length, res.lastName.length, res.email.length];
        new roughViz.Bar({
          element: '#viz0',
          data: {labels: this.graphicData.labels, values: this.graphicData.values},
          title: 'Data Length',
          stroke: 'coral',
          strokeWidth: 3,
          color: 'pink',
          fillWeight: 1.5,
        });
        new roughViz.Donut(
          {
            element: '#viz1',
            titleFontSize: '1.5rem',
            data: {labels: this.graphicData.labels, values: this.graphicData.values},
            title: 'Data Length',
            stroke: 'coral',
            color: 'pink',
            fillWeight: 1.5,
          }
        );
      });
  }

  public ngOnDestroy(): void {
    if (this.getUserRequest$) {
      this.getUserRequest$.unsubscribe();
    }
  }

}
