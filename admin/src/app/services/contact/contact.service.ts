import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token/token.service'; 

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

  private apiUrl = 'http://localhost:5000/contact';
  private token = 'Token'; // You should replace this with the actual token

  constructor(private httpClient: HttpClient,private tokenService: TokenService) {}

  // ... (other methods)

  onContactGetAll() {
    const token = this.tokenService.getToken(); // Retrieve token from TokenService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token ? this.token : ''}`);
    return this.httpClient.get(this.apiUrl, { headers });
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
