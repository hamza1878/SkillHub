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
import { CvService } from '../../../cv.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  // loginForm: FormGroup;
  login = { email: '', password: '',role:'' };
ROLE_QYERY=gql`
query User {
  authenticatedItem {
    ... on User {
      role
      email
      password {
        isSet
      }
    }
  }
}`;

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
    private AuthServiceService: AuthServiceService,
    private CvService:CvService
  ) {
    // this.loginForm = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required],
    // });
  }
  ngOnInit(): void {
    console.log("role",this.ROLE_QYERY)
    this.AuthServiceService.localStorage.getItem(this.login.email);

  }
  roleporbleme='COMPANY'
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
          roles:this.ROLE_QYERY
          
        },
      })
    
      .subscribe({
        next: ({ data }) => {
          console.log(data)
          
          if (
            data?.authenticateUserWithPassword?.__typename ===
            'UserAuthenticationWithPasswordSuccess'
          ) {
            console.log(data.authenticateUserWithPassword.item);
            const user = data.authenticateUserWithPassword.item;
            console.log('User data:', user);
            if (user.role) {
              this.CvService.setRole(user.role);
            } else {
              this.CvService.setRole('COMPANY'); 
            }
            this.CvService.iduser(user.id)
            


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
