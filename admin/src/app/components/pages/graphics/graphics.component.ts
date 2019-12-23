import { Component, OnInit } from '@angular/core';

import roughViz from 'rough-viz';

import { RequestsService } from '../../../services/requests/requests.service';
import { User } from '../../admin/user';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit {

  public rolesCounter = {
    'Admin': 0,
    'Super admin': 0,
    'User': 0
  };

  constructor(private api: RequestsService) { }

  ngOnInit() {
    this.api.get({url: '/users/get'})
      .subscribe((res) => {
        res.forEach(user => {
          this.rolesCounter[user.role]++
        });

        // new roughViz.Pie({
        //   element: '#viz0',
        //   data: {
        //     labels: ['Admin', 'Super admin', 'User'],
        //     values: [this.rolesCounter['Admin'], this.rolesCounter['Super admin'], this.rolesCounter['User']]
        //   },
        // })
      });
  }

}
