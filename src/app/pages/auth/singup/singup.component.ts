import { Component } from '@angular/core';
  import{Router}from'@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { CvService } from '../../../cv.service';
import { Apollo, gql } from 'apollo-angular';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css',
  standalone:false,
})
export class SingupComponent {
   currentRole: any;
  // user: any = { firstName: '', lastName: '', email: '', password: '',role:'' };

   constructor(private router: Router, private cvService: CvService, private apollo: Apollo) {}

   ngOnInit(): void {
     this.cvService.role$.subscribe(role => {
       this.currentRole = role;
       console.log('Current Role in Other Component:', this.currentRole);
     });
   }
 

  // goToLogin() {
  //   this.router.navigate(['login']).then(success => {
  //     console.log('Navigation success: ', success);
  //   }).catch(error => {
  //     console.error('Navigation error: ', error);
  //   });
  // }

  // // ✅ GraphQL Sign-Up Mutation
  // // private SIGN_UP_MUTATION = gql`
  // //   mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  // //     signUp(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
  // //       token
  // //       user {
  // //         id
  // //         firstName
  // //         lastName
  // //         email
  // //       }
  // //     }
  // //   }
  // // `;

  // signUp(event: Event) {
  //   event.preventDefault(); 
  
  //   if (!this.user.email || !this.user.password) {
  //     alert('Email and password are required!');
  //     return;
  //   }
  
  //   if (this.user.password.length < 8) {
  //     alert('Password must be at least 8 characters long!');
  //     return;
  //   }
  
  //   const SIGN_UP_MUTATION = gql`
  //     mutation CreateUser($data: UserCreateInput!) {
  //       createUser(data: $data) {
  //         firstName
  //         lastName
  //         email
  //         role
  //       }
  //     }
  //   `;
  
  //   this.apollo.mutate({
  //     mutation: SIGN_UP_MUTATION,
  //     variables: { data: this.user }
  //   }).subscribe({
  //     next: (response: any) => {
  //       console.log('Signup successful:', response);
  //       this.router.navigate(['/dashboard']);
  //     },
  //     error: (error) => {
  //       console.error('Signup failed:', error);
  
  //       if (error.message.includes('Unique constraint failed on the fields: (`email`)')) {
  //         alert('This email is already in use. Please use another email.');
  //       } else {
  //         alert('An error occurred during signup. Please try again.');
  //       }
  //     }
  //   });
  // }
}  