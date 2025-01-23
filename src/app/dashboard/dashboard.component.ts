import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CvService } from '../cv.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menuOpen = true;
 currentRole='';
  // currentRole: string | null = null;


  constructor(private router:Router,private cvService: CvService, ) {}

  ngOnInit(): void {
    this.cvService.role$.subscribe((setRole) => {
      console.log(setRole)

      console.log(this.currentRole)
      this.currentRole = setRole;
    });
  
   
  }
  toggleMenu() {
    console.log('Toggle menu clicked'); 
    this.menuOpen = !this.menuOpen;
  }
  name:string=''
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
