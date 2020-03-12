import { Injectable } from '@angular/core';
import {FileUploadModel} from "../../models/file-field";

@Injectable()
export class FileDownloadService {

  constructor() { }

  public downloadFile(file: FileUploadModel) {
      //TODO: download file
  }
}
