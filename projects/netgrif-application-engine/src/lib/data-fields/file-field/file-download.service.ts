import { Injectable } from '@angular/core';
import {FileUploadModel} from './file-field';

@Injectable()
export class FileDownloadService {

  constructor() { }

  public downloadFile(file: FileUploadModel) {
      // TODO: download file
  }
}
