import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token/token.service';

export interface BlogForm {
  _id: string;
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

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {}

  // Store the token securely (e.g., in a service)
  private token: string | null = null;

  setToken(newToken: string) {
    this.token = newToken;
  }

  onBlogSave(blogForm: BlogForm) {
    const token = this.tokenService.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token ? this.token : ''}`);

    const formData = new FormData();
    formData.append('image', blogForm.image);
    formData.append('category', blogForm.category);
    formData.append('title', blogForm.title);
    formData.append('description', blogForm.description);
    formData.append('website', blogForm.website);
  
    return this.httpClient.post('http://localhost:5000/blogs', formData, { headers }); // Pass the headers
  }

  onBlogGetAll() {
    return this.httpClient.get('http://localhost:5000/blogs');
  }

  onBlogDelete(id: string) {
    const token = this.tokenService.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token ? this.token : ''}`);

    return this.httpClient.delete('http://localhost:5000/blogs/' + id, { headers });
  }

  onBlogFindOne(id: string) {
    return this.httpClient.get('http://localhost:5000/blogs/' + id);
  }

  onBlogUpdate(id: string, blogForm: BlogForm) {
    const token = this.tokenService.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token ? this.token : ''}`);

    const formData = new FormData();
    formData.append('image', blogForm.image);
    formData.append('category', blogForm.category);
    formData.append('title', blogForm.title);
    formData.append('description', blogForm.description);
    formData.append('website', blogForm.website);
  
    return this.httpClient.put('http://localhost:5000/blogs/' + id, formData, { headers });
  }

  onBlogDeleteAll() {
    const token = this.tokenService.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token ? this.token : ''}`);

    return this.httpClient.delete('http://localhost:5000/blogs', { headers });
  }
}
