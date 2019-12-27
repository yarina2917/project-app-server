import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }

  public encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, environment.secretKey.trim()).toString();
  }

  public decrypt(textToDecrypt: string): string {
    return CryptoJS.AES.decrypt(textToDecrypt, environment.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
