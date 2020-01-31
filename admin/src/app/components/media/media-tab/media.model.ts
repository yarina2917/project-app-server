import { environment } from '../../../../environments/environment';

export class MediaModel {
  public fileUrl = environment.apiUrl + '/files/';
  public fileInput = '';
  public title = '';
  public file = null;
  public data = [];
  public userId = '';
  public loading = false;
}
