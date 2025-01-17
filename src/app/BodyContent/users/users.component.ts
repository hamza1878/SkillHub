import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: false,
  
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
role ='full-stack';
phoneNumber='92969805';
email='hamzabensassi';
firstName= 'hamza';
lastName='bensassi' ;
isBrowser: boolean;
shows=false
show(){
  this.shows=!this.shows
}

constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  this.isBrowser = isPlatformBrowser(this.platformId); // Check if it's the browser
}

}
