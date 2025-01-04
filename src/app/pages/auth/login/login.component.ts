import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import{Router}from'@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule] 

})
export class LoginComponent {
  loginForm: FormGroup;
  login = { email: '', password: '' };

  constructor(private fb: FormBuilder,private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
       }
   signup() {
    alert('Navigating to Sign Up');
    this.router.navigate(['/signup']).then(success => {
      console.log('Navigation success: ', success);
    }).catch(error => {
      console.error('Navigation error: ', error);
    });
  }
  onSubmit() {
    alert("is ok")
    console.log("email", this.login.email, "pwd", this.login.password);
    if (this.login.email === "hbs3107717@gmail.com") {
      this.router.navigate(['/dashboard']).then(success => {
        console.log('Navigation success: ', success);
      }).catch(error => {
        console.error('Navigation error: ', error);
      });
    } else {
      alert('Invalid email or password');
    }
  }
    
}
