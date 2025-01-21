import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { nextTick } from 'process';
import { subscribe } from 'graphql';
import { AuthServiceService } from '../../../auth-service.service';
import { Mutation, UserRoleType } from '../../../../generated/graphql';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  // loginForm: FormGroup;
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
            picture {
              url
            }
            status
            updatedAt
            email
            role
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
    private readonly apollo: Apollo,
    private AuthServiceService: AuthServiceService
  ) {
    // this.loginForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required],
    // });
  }
  ngOnInit(): void {
    this.AuthServiceService.localStorage.getItem(this.login.email);
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
  backend(): void {
    console.log('mutation', this.LOGIN_MUTATION);
    this.apollo
      .mutate<Mutation>({
        mutation: this.LOGIN_MUTATION,
        variables: {
          email: this.login.email,
          password: this.login.password,
        },
      })
      .subscribe({
        next: ({ data }) => {
          if (
            data?.authenticateUserWithPassword?.__typename ===
            'UserAuthenticationWithPasswordSuccess'
          ) {
            console.log(data.authenticateUserWithPassword.item);

            this.AuthServiceService.setUserEmail(this.login.email);

            this.router.navigate(['/dasboard']);
          } else {
            alert('Error:hhhh ' + data?.authenticateUserWithPassword);
          }
        },
        error: (error) => {
          console.error('Mutation error:', error);
          alert('An error occurred during the login process.');
        },
      });
  }
}
