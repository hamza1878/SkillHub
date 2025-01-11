import { Component } from '@angular/core';
  import{Router}from'@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { CvService } from '../../../cv.service';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css',
  standalone:false,
})
export class SingupComponent {
  currentRole: any;
  constructor(private router:Router,private cvService: CvService) {}

  login() {
    alert('Navigating to Sign Up');
    this.router.navigate(['login']).then(success => {
      console.log('Navigation success: ', success);
    }).catch(error => {
      console.error('Navigation error: ', error);
    });
  }
  
  ngOnInit(): void {
    this.cvService.role$.subscribe(role => {
      this.currentRole = role;
      console.log('Current Role in Other Component:', this.currentRole);
    });
  }

}