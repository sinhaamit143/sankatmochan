import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) {}


  onBlogGetAllPublic() {
    return this.httpClient.get(`${environment.url}/blogs/public`);
  }
  

  // Fetch a single blog by ID
  onBlogFindOne(id: string) {
    return this.httpClient.get(`${environment.url}/blogs/get/${id}`);
  }


}