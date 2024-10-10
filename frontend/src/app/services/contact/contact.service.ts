import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  isAgreedModal() {
    throw new Error('Method not implemented.');
  }
  setAgreed(arg0: boolean) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) {}

  onContactSave(contactForm: ContactForm) {
    console.log(contactForm);
    return this.httpClient.post(`${environment.url}/contact`, contactForm);
  }
}

