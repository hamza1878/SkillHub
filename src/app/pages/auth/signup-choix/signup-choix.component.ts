import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CvService } from '../../../cv.service';

@Component({
  selector: 'app-signup-choix',
  standalone: false,
  
  templateUrl: './signup-choix.component.html',
  styleUrl: './signup-choix.component.css'
})
export class SignupChoixComponent {
  constructor(private router:Router,private cvService: CvService){
    
  }
  role:any
  navigate(role: any) {
    console.log('Role:', role); 

    this.router.navigate(['signup']);

    this.cvService.role(role);

    this.cvService.role$.subscribe(updatedRole => {
      console.log('Updated Role ', updatedRole);
    });
  }} 
