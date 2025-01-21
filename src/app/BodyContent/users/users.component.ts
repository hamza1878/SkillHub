import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthServiceService } from '../../auth-service.service';
import { isPlatformBrowser } from '@angular/common';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  role: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: false,
})
export class UsersComponent {
  userData!: User | null;
  isBrowser: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apollo: Apollo,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const userEmail = this.authService.getUserEmail();
      if (userEmail) {
        this.fetchUserData(userEmail);
      } else {
        console.log('User email not found in localStorage.');
      }
    }
  }

//   private GET_USER_QUERY = gql`
//    query GetUser($email: String!) {
//   user(where: { email: $email }) {
//     email
//     firstName
//     lastName
//     role
//   }
// }
//   `;

  fetchUserData(email: string): void {
    // if (!email) {
    //   console.error('Email is required but was not found.');
    //   return;
    // }

    // this.apollo.watchQuery<{ user: User }>({
    //   query: this.GET_USER_QUERY,
    //   variables: { email: email },
    // }).valueChanges.subscribe(result => {
    //   if (result.loading) {
    //     console.log('Loading user data...');
    //     this.userData = null;
    //   }
    //   if (result.error) {
    //     console.error('Error loading user data:', result.error);
    //     this.userData = null;
    //   }
    //   if (result.data && result.data.user) {
    //     this.userData = result.data.user;
    //   } else {
    //     this.userData = null;
    //   }
    // });
  }
}