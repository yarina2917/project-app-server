import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from "../../../services/requests/requests.service";

@Component({
  selector: 'app-media-tab',
  templateUrl: './media-tab.component.html',
  styleUrls: ['./media-tab.component.scss']
})
export class MediaTabComponent implements OnInit, OnDestroy {

  public file = null;
  public fileInput = '';
  public title = '';
  public data = [];
  public requests$ = {
    get: null,
    post: null,
    delete: null
  };

  @Input() type: string;

  constructor(private api: RequestsService) { }

  ngOnInit() {
    this.requests$.get = this.api.get({url: `/files/get?type=${this.type}`})
      .subscribe((res) => {
        this.data = res;
      })
  }

  public onFileChanged(event) {
    this.file = event.target.files[0];
  }

  public onUpload() {
    const extname = this.file.name.split('.').pop();
    this.requests$.post = this.api.post({url: `/files/upload?type=${this.type}&title=${this.title}&extname=${extname}`, body: this.file})
      .subscribe((res) => {
        this.title = '';
        this.fileInput = '';
        this.data.unshift(res);
      })
  }

  public deleteMedia(item) {
    this.requests$.delete = this.api.delete({url: `/files/delete/${item._id}?path=${item.path}`})
      .subscribe((res) => {
        this.data = this.data.filter(el => el._id !== item._id)
      })
  }

  public ngOnDestroy(): void {
    for (const item in this.requests$) {
      if (this.requests$[item]) {
        this.requests$[item].unsubscribe();
      }
    }
  }

}
