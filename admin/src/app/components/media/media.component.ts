import { Component, OnInit } from '@angular/core';
import { RequestsService } from "../../services/requests/requests.service";

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  constructor(private api: RequestsService) { }

  ngOnInit() {}

}
