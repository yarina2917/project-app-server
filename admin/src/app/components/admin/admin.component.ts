import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests/requests.service';
import { MatDialog } from '@angular/material';
import { ModalInfoComponent } from '../modal-info/modal-info.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public file;
  public fileValue;
  public users = [];

  constructor(
    private api: RequestsService,
    public dialog: MatDialog
  ) { }

  public ngOnInit() {}

  public onFileChanged(event): void {
    this.file = event.files[0];
  }

  public exportUsers(): void {
    this.api.get({url: '/users/export'})
      .subscribe(
        () => this.openDialog('Success export'),
        err => this.openDialog(err.message)
      );
  }

  public addUsers(): void {
    this.api.post({url: '/users/import', body: this.file})
      .subscribe(
        () => {
          this.file = null;
          this.fileValue = '';
          this.openDialog('Success import');
          this.getUsers();
        },
        err => {
          this.openDialog(`Error: ${err.error.message}`);
          this.getUsers();
        }
      );
  }

  public getUsers(): void {
    this.api.get({url: '/users/get'})
      .subscribe(res => this.users = res);
  }

  public openDialog(message: string): void {
    this.dialog.open(ModalInfoComponent, {
      width: '400px',
      data: {message}
    });
  }

}
