import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 
 constructor(private router:Router){}
 logPath(path: string): void {
  alert(`Path clicked: ${path}`);
  this.router.navigate([path])
  // // Navigate to the provided path and handle navigation success or failure
  // this.router.navigate([path]).then(success => {
  //   if (success) {
  //     console.log('Navigation was successful!');
  //   } else {
  //     console.log('Navigation failed.');
  //   }
  // });
}

}
