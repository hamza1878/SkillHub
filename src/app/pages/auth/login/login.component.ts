import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { UserAuthenticationWithPasswordResult ,UserAuthenticationWithPasswordFailure,UserAuthenticationWithPasswordSuccess, Maybe, Mutation} from '../../../../graphql/generated';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  login = { email: '', password: '' };

  LOGIN_MUTATION = gql`
    mutation ($email: String!, $password: String!) {
      authenticateUserWithPassword(email: $email, password: $password) {
        ... on UserAuthenticationWithPasswordSuccess {
          sessionToken
          item {
            firstName
            createdAt
            id
            profilePicture
            status
            updatedAt
            email
          }
        }
        ... on UserAuthenticationWithPasswordFailure {
          message
        }
      }
    }
  `;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly apollo: Apollo
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  signup() {
    alert('Navigating to Sign Up');
    this.router
      .navigate(['/choix'])
      .then((success) => {
        console.log('Navigation success: ', success);
      })
      .catch((error) => {
        console.error('Navigation error: ', error);
      });
  }
  onSubmit() {
    console.log('mutation', this.LOGIN_MUTATION);
    this.apollo
      .mutate<Mutation>({
        mutation: this.LOGIN_MUTATION,
        variables: {
          email: this.login.email,
          password: this.login.password,
        },
      })

      .subscribe(
        ({ data }) => {
       
            if(data?.authenticateUserWithPassword?.__typename==="UserAuthenticationWithPasswordSuccess"){
                console.log(data.authenticateUserWithPassword.item)
            }else{
              alert("error")
            }
            
           
          
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
    // if (this.login.email === 'hbs3107717@gmail.com') {
    //   this.router
    //     .navigate(['/dashboard'])
    //     .then((success) => {
    //       console.log('Navigation success: ', success);
    //     })
    //     .catch((error) => {
    //       console.error('Navigation error: ', error);
    //     });
    // } else {
    //   alert('Invalid email or password');
    // }
  }
}
