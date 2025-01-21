import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  localStorage: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

setUserEmail(email: string) {
  localStorage.setItem('userEmail', email);
}

getUserEmail() {
  return localStorage.getItem('userEmail');
}

}