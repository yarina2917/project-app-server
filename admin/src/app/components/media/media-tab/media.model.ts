import { environment } from '../../../../environments/environment';

export class MediaModel {
  public filesExt = 'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf';
  public fileUrl = environment.apiUrl + '/files/';
  public fileInput = '';
  public title = '';
  public file = null;
  public data = [];
}
