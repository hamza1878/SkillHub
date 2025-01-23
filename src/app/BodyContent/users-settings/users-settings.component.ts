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
    createdAtTime: '',
    updatedAtTime: '',
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
      status: [''], // Ensure valid enum values
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

  updateuser(): void {
    const userForm = this.userForm.value;
    console.log('Form Values:', userForm); // Log form values for debugging
  
    if (!this.id) {
      console.error('❌ User ID not found.');
      return;
    }
  
    // Ensure the status value is valid
    if (!['active', 'inactive', 'pending'].includes(userForm.status.toLowerCase())) {
      console.error('❌ Invalid status value:', userForm.status);
      return;
    }
  
    // Define the GraphQL mutation
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
  
    // Send the mutation
    this.apollo
      .mutate({
        mutation: userSettingsMutation,
        variables: {
          where: { id: this.id },
          data: {
            firstName: userForm.firstName,
            lastName: userForm.lastName,
            phone: userForm.phone,
            linkedin: userForm.linkedin,
            github: userForm.github,
            technologies: userForm.technologies,
            jobTitle: userForm.jobTitle,
            description: userForm.description,
            status: userForm.status.toLowerCase(), // Convert to lowercase to match the enum
            picture: userForm.picture ? { upload: userForm.picture } : null,
            updatedAt: new Date().toISOString(),
          },
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

  onProfilePictureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicturePreview = reader.result; // Update the profile picture preview
      };
      reader.readAsDataURL(file);
    }
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
      }
    }
  `;
  

  this.apollo
  .watchQuery({
    query: GET_USER_QUERY,
    variables: {
      where: { id: { equals: this.id } }, // Correction ici
    },
  })
  .valueChanges.subscribe({
    next: (response: any) => {
      const userData = response.data.users[0];
      console.log('Données utilisateur récupérées:', userData);

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
      });

      if (userData.picture) {
        this.profilePicturePreview = userData.picture.url;
      }
    },
    error: (error) => {
      console.error('❌ Erreur lors de la récupération des données utilisateur:', error);
    },
  });

}  }
