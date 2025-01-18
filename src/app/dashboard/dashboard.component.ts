import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menuOpen = true;

  toggleMenu() {
    console.log('Toggle menu clicked'); 
    this.menuOpen = !this.menuOpen;
  }
  name:string=''
 constructor(private router:Router){}
 logPath(path: string): void {
  this.router.navigate([path])
  this.name=path
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
