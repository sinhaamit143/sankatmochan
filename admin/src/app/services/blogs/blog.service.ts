import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment';

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
  constructor(private httpClient: HttpClient, private tokenService: TokenService) {}

  private getAuthorizationHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token ? token : ''}`);
  }

  onBlogSave(blogForm: BlogForm) {
    const headers = this.getAuthorizationHeaders();

    const formData = new FormData();
    formData.append('image', blogForm.image);
    formData.append('category', blogForm.category);
    formData.append('title', blogForm.title);
    formData.append('description', blogForm.description);
    formData.append('website', blogForm.website);

    return this.httpClient.post(`${environment.url}/blogs`, formData, { headers });
  }

  onBlogGetAll() {
    const headers = this.getAuthorizationHeaders(); // Include headers if needed for this route
    return this.httpClient.get(`${environment.url}/blogs`, { headers });
  }

  onBlogDelete(id: string) {
    const headers = this.getAuthorizationHeaders();
    return this.httpClient.delete(`${environment.url}/blogs/${id}`, { headers });
  }

  // For public access to blog by ID, no need for token
  onBlogFindOne(id: string) {
    return this.httpClient.get(`${environment.url}/blogs/get/${id}`); // Public route
  }

  onBlogUpdate(id: string, blogForm: BlogForm) {
    const headers = this.getAuthorizationHeaders();

    const formData = new FormData();
    formData.append('image', blogForm.image);
    formData.append('category', blogForm.category);
    formData.append('title', blogForm.title);
    formData.append('description', blogForm.description);
    formData.append('website', blogForm.website);

    return this.httpClient.put(`${environment.url}/blogs/${id}`, formData, { headers });
  }

  onBlogDeleteAll() {
    const headers = this.getAuthorizationHeaders();
    return this.httpClient.delete(`${environment.url}/blogs`, { headers });
  }
}
