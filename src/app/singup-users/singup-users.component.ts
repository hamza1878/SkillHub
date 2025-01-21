import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { CvService } from '../cv.service';
import { Apollo, gql } from 'apollo-angular';
import { RoleService } from '../role.service';
import { UserRoleType } from '../../generated/graphql';
@Component({
  selector: 'app-singup-users',
  standalone: false,

  templateUrl: './singup-users.component.html',
  styleUrl: './singup-users.component.css',
})
export class SingupUsersComponent {
  currentRole: UserRoleType | undefined;
  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  };

  constructor(
    private router: Router,
    private cvService: CvService,
    private apollo: Apollo,
    private RoleService: RoleService
  ) {}

  ngOnInit(): void {
    this.cvService.role$.subscribe((role: UserRoleType) => {
      this.currentRole = role;
      console.log('Current Role in Other Component:', this.currentRole);
      this.user.role = this.currentRole;
    });
  }
  setRole(role: string): void {
    this.user.role = role;
    this.RoleService.setRole(role); // Store the selected role in RoleService
  }
  goToLogin(): void {
    this.router
      .navigate(['login'])
      .then((success) => console.log('Navigation success:', success))
      .catch((error) => console.error('Navigation error:', error));
  }

  signUp(event: Event): void {
    event.preventDefault();

    // Validate form fields
    if (!this.user.email || !this.user.password) {
      alert('Email and password are required!');
      return;
    }

    if (this.user.password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    const SIGN_UP_MUTATION = gql`
      mutation CreateUsers($data: [UserCreateInput!]!) {
        createUsers(data: $data) {
          firstName
          lastName
          email
          password {
            isSet
          }
          role
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: SIGN_UP_MUTATION,
        variables: {
          data: [this.user], // Ensure backend expects this structure
        },
      })
      .subscribe({
        next: (response: any) => {
          console.log('Signup successful:', response);
          alert('Signup successful! Redirecting to the dashboard...');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Signup failed:', error);
          const errorMessage = error.message.includes(
            'Unique constraint failed on the fields: (`email`)'
          )
            ? 'This email is already in use. Please use another email.'
            : 'An error occurred during signup. Please try again.';
          alert(errorMessage);
        },
      });
  }
}
