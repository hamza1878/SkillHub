import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthServiceService } from '../../auth-service.service';
import { isPlatformBrowser } from '@angular/common';
import { CvService } from '../../cv.service';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  jobTitle: string;
  phoneNumber: string;
  description: string;
  linkedin: string;
  phone: string;
  picture : string;
  technologies: string;
  github:string;
      
  
  
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone:false,
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  userData!: User | null;
  isBrowser: boolean = false;
  id: string | null | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apollo: Apollo,
    private authService: AuthServiceService,
        private cvService: CvService
    
  ) {}

  ngOnInit(): void {
    this.cvService.id$.subscribe((id) => {
      this.id = localStorage.getItem("current_user");
      console.log('fsdefvsfv', id);
      this.fetchUserData();
    });
  }

  fetchUserData(): void {
    const  UsersProfile = gql`
   query Companies($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    firstName
    lastName
    role
    picture {
      id
      filesize
      width
      height
      extension
      url
    }
    phone
    linkedin
    github
    technologies
    jobTitle
    description
    email
    
    status
    createdAt
    updatedAt
  }
}
  `;
  
  this.apollo
    .watchQuery({
      query: UsersProfile,
      variables: { where: { id: this.id } },
    })
    .valueChanges.subscribe({
      next: (result: any) => {
        if (result?.data?.user) {
          this.userData = result.data.user; 
          console.log(this.userData)
        } else {
          console.log('No user data found.');
          this.userData = null;
        }
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.userData = null;
      },
    });
  }}  

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

  //fetchUserData(email: string): void {
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
