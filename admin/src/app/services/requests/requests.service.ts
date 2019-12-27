import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Handlers,
  GetOptions,
  PostOptions,
  PutOptions,
  DeleteOptions
} from '../interfaces/request.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public post<TRequestBody, TResponseBody>(options: PostOptions<TRequestBody, TResponseBody>): any {
    return this.httpClient
      .post<TResponseBody>(this.apiUrl + options.url, options.body);
  }

  public get<TResponseBody>(options: GetOptions<TResponseBody>): any {
    return this.httpClient
      .get<TResponseBody>(
        this.apiUrl + options.url,
        {params: options.parameters});
  }

  public put<TRequestBody, TResponseBody>(options: PutOptions<TRequestBody, TResponseBody>): any {
    return this.httpClient
      .put<TResponseBody>( this.apiUrl + options.url, options.body);
  }

  public delete<TResponseBody>(options: DeleteOptions<TResponseBody>): any {
    return this.httpClient
      .delete<TResponseBody>(this.apiUrl + options.url, {params: options.parameters});
  }
}
