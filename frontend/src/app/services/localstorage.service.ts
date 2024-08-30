import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  
  private localStorageKey = 'isAgreed';

  constructor() { }

  isAgreedModal(): boolean {
    return localStorage.getItem(this.localStorageKey) === 'true';
  }

  setAgreed(agreed: boolean): void {
    localStorage.setItem(this.localStorageKey, agreed.toString());
  }

}
