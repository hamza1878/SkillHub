import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../../cv.service';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-settings',
  standalone: false,
  templateUrl: './users-settings.component.html',
  styleUrl: './users-settings.component.css'
})
export class UsersSettings implements OnInit {
  userForm!: FormGroup;
  profilePicturePreview: string | ArrayBuffer | null = null;
  userId: string = '';
  idmail: string = '';
  selectedFile: File | null = null;

  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    technologies: '',
    jobTitle: '',
    description: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    picture: [null]  // Add picture control
  };
  id: any;

  constructor(
    private fb: FormBuilder,
    private cvService: CvService,
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      linkedin: [''],
      github: [''],
      technologies: [''],
      jobTitle: [''],
      description: [''],
      status: [''],
      createdAt: [''],
      updatedAt: [''],
    });

    // Fetch the user ID from the service or local storage
    this.cvService.id$.subscribe((id) => {
      this.id = localStorage.getItem('current_user');
      console.log('User ID:', this.id);
    });
    if (this.id) {
      this.fetchUserData();
    }
  }

  // Handle the profile picture selection
  onProfilePictureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicturePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Update user details and handle file upload
  updateuser(): void {
    const userForm = this.userForm.value;
    console.log('Form Values:', userForm);

    if (!this.id) {
      console.error('❌ User ID not found.');
      return;
    }

    // Ensure the status value is valid
    if (!['active', 'inactive', 'pending'].includes(userForm.status.toLowerCase())) {
      console.error('❌ Invalid status value:', userForm.status);
      return;
    }

    // GraphQL Mutation for file upload
    const userSettingsMutation = gql`
      mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
        updateUser(where: $where, data: $data) {
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
          password {
            isSet
          }
          status
          createdAt
          updatedAt
        }
      }
    `;

    const data = {
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      phone: userForm.phone,
      linkedin: userForm.linkedin,
      github: userForm.github,
      technologies: userForm.technologies,
      jobTitle: userForm.jobTitle,
      description: userForm.description,
      status: userForm.status.toLowerCase(),
      picture: this.selectedFile ? { upload: this.selectedFile } : null,
      updatedAt: new Date().toISOString(),
    };

    // Perform Apollo mutation with file upload
    this.apollo
      .mutate({
        mutation: userSettingsMutation,
        variables: {
          where: { id: this.id },
          data: {
            picture: this.selectedFile ? { upload: this.selectedFile } : null,
            firstName: userForm.firstName,
            lastName: userForm.lastName,
            phone: userForm.phone,
            linkedin: userForm.linkedin,
            github: userForm.github,
            technologies: userForm.technologies,
            jobTitle: userForm.jobTitle,
            description: userForm.description,
            status: userForm.status.toLowerCase(),
            updatedAt: new Date().toISOString(),
          },
        },
        context: {
          useMultipart: true, // Enable multipart form data for file upload
        },
      })
      .subscribe({
        next: (response) => {
          console.log('✅ Update successful:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('❌ Error during update:', error);
          if (error.graphQLErrors) {
            error.graphQLErrors.forEach((err: any) => {
              console.error('GraphQL Error:', err.message);
            });
          }
          if (error.networkError) {
            console.error('Network Error:', error.networkError);
          }
        },
      });
  }

  fetchUserData(): void {
    const GET_USER_QUERY = gql`
      query Query($where: UserWhereInput!) {
        users(where: $where) {
          id
          firstName
          lastName
          email
          phone
          linkedin
          github
          technologies
          jobTitle
          description
          status
          createdAt
          updatedAt
          picture {
            url
          }
        }
      }
    `;

    this.apollo
      .watchQuery({
        query: GET_USER_QUERY,
        variables: {
          where: { id: { equals: this.id } },
        },
      })
      .valueChanges.subscribe({
        next: (response: any) => {
          const userData = response.data.users[0];
          console.log('User Data:', userData);

          this.userForm.patchValue({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            linkedin: userData.linkedin,
            github: userData.github,
            technologies: userData.technologies,
            jobTitle: userData.jobTitle,
            description: userData.description,
            status: userData.status,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
          });

          if (userData.picture) {
            this.profilePicturePreview = userData.picture.url;
          }
        },
        error: (error) => {
          console.error('❌ Error fetching user data:', error);
        },
      });
  }
}
