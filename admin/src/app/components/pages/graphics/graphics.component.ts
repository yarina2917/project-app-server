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

  constructor(private api: RequestsService) { }

  ngOnInit() {}

}
