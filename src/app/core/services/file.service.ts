import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UrlManagerService } from '../url-manager.service';

@Injectable()
export class FileService {
  constructor(public http: HttpClient, public urlManagerService: UrlManagerService) {
  }

  /*
  uploadBatch(fileToUpload: File): Observable<any> {
    const url = this.urlManagerService.file.batchContents();
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(url, formData);
  }*/
}
