import { Component } from '@angular/core';
  import{Router}from'@angular/router';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent {
  constructor(private router:Router) {}

  login() {
    alert('Navigating to Sign Up');
    this.router.navigate(['login']).then(success => {
      console.log('Navigation success: ', success);
    }).catch(error => {
      console.error('Navigation error: ', error);
    });
  }
}
