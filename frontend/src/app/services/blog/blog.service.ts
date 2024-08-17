import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) {}


  onBlogGetAll() {
    return this.httpClient.get('http://localhost:5000/blogs');
  }



  onBlogFindOne(id: string) {
    return this.httpClient.get('http://localhost:5000/blogs/' + id);
  }


}