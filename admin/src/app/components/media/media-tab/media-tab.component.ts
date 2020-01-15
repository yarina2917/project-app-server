import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from '../../../services/requests/requests.service';
import { MediaModel } from './media.model';
import { MatDialog } from '@angular/material';
import { ModalInfoComponent } from '../../modal-info/modal-info.component';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-media-tab',
  templateUrl: './media-tab.component.html',
  styleUrls: ['./media-tab.component.scss']
})
export class MediaTabComponent implements OnInit, OnDestroy {

  public model;
  public requests$ = {
    get: null,
    post: null,
    delete: null
  };

  @Input() type: string;

  constructor(
    private api: RequestsService,
    public dialog: MatDialog,
    private usersService: UsersService
  ) {
    this.model = new MediaModel();
  }

  public ngOnInit(): void {
    this.requests$.get = this.api.get({url: `/files/get?type=${this.type}`})
      .subscribe(res => this.model.data = res.reverse());
  }

  public onFileChanged(event): void {
    if (event.files[0]) {
      if (event.files[0].size > 10485760) {
        this.openDialog('File size larger than 10 MB');
        this.model.fileInput = '';
      } else {
        this.model.file = event.files[0];
      }
    }
  }

  public onUpload(): void {
    const extname = this.model.file.name.split('.').pop();
    this.requests$.post = this.api.post({
      url: `/files/upload?type=${this.type}&title=${this.model.title}&extname=${extname}`,
      body: this.model.file
    })
      .subscribe((res) => {
        this.model.title = '';
        this.model.fileInput = '';
        this.model.data.unshift(res);
      });
  }

  public deleteMedia(item): void {
    this.requests$.delete = this.api.delete({url: `/files/delete/${item._id}?path=${item.path}`})
      .subscribe(() => {
        this.model.data = this.model.data.filter(el => el._id !== item._id);
      });
  }

  public openDialog(message: string): void {
    this.dialog.open(ModalInfoComponent, {
      width: '400px',
      data: { message }
    });
  }

  public ngOnDestroy(): void {
    for (const item in this.requests$) {
      if (this.requests$[item]) {
        this.requests$[item].unsubscribe();
      }
    }
  }

}
