import {Component, OnDestroy, OnInit} from '@angular/core';

import roughViz from 'rough-viz';

import { RequestsService } from '../../services/requests/requests.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit, OnDestroy {

  public requests$ = {
    getUser: null,
    getLogger: null
  };
  public graphicData = {
    labels: ['First name', 'Last name', 'Email'],
    values: []
  };

  constructor(
    private api: RequestsService,
    private usersService: UsersService
  ) { }

  public ngOnInit(): void {

    this.requests$.getLogger = this.api.get({url: '/users/logger'})
      .subscribe(res => {
        if (res && res.length) {
          const data1 = this.getData1(res);
          new roughViz.BarH({
            element: '#viz0',
            data: {labels: data1.labels, values: data1.values},
            title: 'Users uploading info',
            strokeWidth: 3,
            fillStyle: 'zigzag-line',
            highlight: 'gold',
            fillWeight: 1.5,
            width: 500
          });

          const data2 = this.getData2(res);
          new roughViz.StackedBar({
            element: '#viz1',
            data: data2,
            labels: 'date',
            title: 'Users uploading info',
            height: window.innerHeight * 0.7,
            width: window.innerWidth * 0.8,
            roughness: 2,
            colors: [
              'blue',
              '#f996ae',
              'skyblue',
              '#9ff4df',
            ],
            fillWeight: 0.35,
            strokeWidth: 0.5,
            fillStyle: 'cross-hatch',
            stroke: 'black',
          });
        }
      });

    this.requests$.getUser = this.api.get({url: `/users/get-one/${this.usersService.getUserData('id')}`})
      .subscribe(res => {
        this.graphicData.values = [res.firstName.length, res.lastName.length, res.email.length];
        new roughViz.Bar({
          element: '#viz2',
          data: {labels: this.graphicData.labels, values: this.graphicData.values},
          title: 'Data Length',
          stroke: 'coral',
          strokeWidth: 3,
          color: 'pink',
          fillWeight: 1.5,
        });
        new roughViz.Donut(
          {
            element: '#viz3',
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

  public getData1(loggerData) {
    const data = {
      labels: [],
      values: []
    };
    loggerData.forEach(el => {
      data.labels.push(new Date(el.date).toLocaleString());
      data.values.push(el.countAll);
    });
    return data
  }

  public getData2(loggerData) {
    return loggerData.map(el => ({
        date: new Date(el.date).toLocaleString(),
        all: el.countAll,
        success: el.countSuccess,
        errors: el.errors.length
      }
    ))
  }

  public ngOnDestroy(): void {
    for (const item in this.requests$) {
      if (this.requests$[item]) {
        this.requests$[item].unsubscribe();
      }
    }
  }

}
