import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient
  ) { }

  uploadFile(file: any) {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http.post(`${environment.url}` + '/file/upload', fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadDocument(file: File, student:any) {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http.post( `${environment.url}` + '/file/uploadDocument/'+ student, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

  saveUploadedFile(data: any) {
    return this.http.post(`${environment.url}/fileSave/createFileRecord`, data);
  }

  getFilesList(data: any) {
    return this.http.post(`${environment.url}/fileSave/getFilesList`, data);
  }
}