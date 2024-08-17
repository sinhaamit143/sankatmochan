import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface ContactForm {
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

  constructor(private httpClient: HttpClient) {}

  onContactGetAll() {
    return this.httpClient.get('http://localhost:5000/contact');
  }

  onContactDelete(id: string) {
    return this.httpClient.delete('http://localhost:5000/contact/' + id);
  }

  onContactFindOne(id: string) {
    return this.httpClient.get('http://localhost:5000/contact/' + id);
  }

  onContactUpdate(id: string, form: ContactForm) {
    return this.httpClient.put('http://localhost:5000/contact/' + id, form);
  }
}
