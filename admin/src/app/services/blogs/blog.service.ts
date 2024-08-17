import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface BlogForm {
  image: File;
  category: string;
  title: string;
  description: string;
  website: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  isAgreedModal() {
    throw new Error('Method not implemented.');
  }
  setAgreed(arg0: boolean) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) {}

  onBlogSave(blogForm: BlogForm) {
    const formData = new FormData();
    formData.append('image', blogForm.image);
    formData.append('category', blogForm.category);
    formData.append('title', blogForm.title);
    formData.append('description', blogForm.description);
    formData.append('website', blogForm.website);
  
    return this.httpClient.post('http://localhost:5000/blogs', formData);
  }

  onBlogGetAll() {
    return this.httpClient.get('http://localhost:5000/blogs');
  }

  onBlogDelete(id: string) {
    return this.httpClient.delete('http://localhost:5000/blogs/' + id);
  }

  onBlogFindOne(id: string) {
    return this.httpClient.get('http://localhost:5000/blogs/' + id);
  }

  onBlogUpdate(id: string, form: BlogForm) {
    return this.httpClient.put('http://localhost:5000/blogs/' + id, form);
  }
}