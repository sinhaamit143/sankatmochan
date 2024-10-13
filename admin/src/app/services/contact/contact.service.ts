import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token/token.service'; 
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface ContactForm {
  _id: string;
  name: string;
  email: string;
  number: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = `${environment.url}/contact`;
  private token = 'token'; // You should replace this with the actual token

  constructor(private httpClient: HttpClient,private tokenService: TokenService) {}

  // ... (other methods)

  onContactGetAll(): Observable<ContactForm[]> {
    const token = this.tokenService.getToken(); // Retrieve token from TokenService
    console.log('Token used for request:', token); // Log the token for debugging
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<ContactForm[]>(this.apiUrl, { headers });
  }
  
  
  onContactDelete(id: string) {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token ? this.token : ''}`);

    return this.httpClient.delete(`${this.apiUrl}/${id}`, { headers });
  }
  
  onContactFindOne(id: string) {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token ? this.token : ''}`);

    return this.httpClient.get(`${this.apiUrl}/${id}`, { headers });
  }
  
  onContactUpdate(id: string, form: ContactForm) {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token ? this.token : ''}`);

    return this.httpClient.put(`${this.apiUrl}/${id}`, form, { headers });
  }
  
  onContactDeleteAll() {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token ? this.token : ''}`);

    return this.httpClient.delete(this.apiUrl, { headers });
  }
  
}
