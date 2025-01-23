import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CvService } from '../../../cv.service';
import { Apollo, gql } from 'apollo-angular';
import { RoleService } from '../../../role.service';
import { Mutation } from '../../../../generated/graphql';

@Component({
  selector: 'app-singup-company',
  standalone: false,

  templateUrl: './singup-company.component.html',
  styleUrl: './singup-company.component.css',
})
export class SingupCompanyComponent {
  currentRole: string = 'company';
  company: any = {
    companyName: '',
    IndustryType: '',
    contactEmail: '',
    password: '',
    role: 'company',
  };

  constructor(
    private router: Router,
    private cvService: CvService,
    private apollo: Apollo,
    private RoleService: RoleService
  ) {}
  setRole(role: string): void {
    this.company.role = role;
    this.RoleService.setRole(role);
  }
  signUp(event: Event) {
    event.preventDefault();

    if (!this.company.contactEmail || !this.company.password) {
      alert('Email and password are required!');
      return;
    }

    if (this.company.password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    const INIT_COMPANY = gql`
      mutation CreateCompany($data: CompanyCreateInput!) {
        createCompany(data: $data) {
          user {
            id
          }
        }
      }
    `;

    const SIGN_UP_MUTATION = gql`
      mutation CreateUser($data: UserCreateInput!) {
        createUser(data: $data) {
          id
          email
          firstName
          password {
            isSet
          }
        }
      }
    `;

    this.apollo
      .mutate<Mutation>({
        mutation: SIGN_UP_MUTATION,
        variables: {
          data: {
            email: this.company.contactEmail,
            password: this.company.password,
          },
        },
      })
      .subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.cvService.iduser(response.data?.createUser?.id);
          this.apollo
            .mutate({
              mutation: INIT_COMPANY,
              variables: {
                data: {
                  user: {
                    connect: {
                      id:   response.data?.createUser?.id,
                    },
                  },
                  name: this.company.name,
                  IndustryType: this.company.IndustryType,
                },
              },
            })
            .subscribe({
              next: (response: any) => {
                console.log('Signup successful:', response);
              },
              error: (error) => {
                console.error('Signup failed:', error);
                if (
                  error.message.includes(
                    'Unique constraint failed on the fields: (email)'
                  )
                ) {
                  alert(
                    'This email is already in use. Please use another email.'
                  );
                } else {
                  alert('An error occurred during signup. Please try again.');
                }
              },
            });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Signup failed:', error);
          if (
            error.message.includes(
              'Unique constraint failed on the fields: (email)'
            )
          ) {
            alert('This email is already in use. Please use another email.');
          } else {
            alert('An error occurred during signup. Please try again.');
          }
        },
      });
  }
}
