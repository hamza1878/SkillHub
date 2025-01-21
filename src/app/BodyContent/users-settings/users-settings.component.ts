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
  resumeFile: File | null = null;
  role: any;

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
      profilePicture: [''],
      email: ['', [Validators.required, Validators.email]],
      resume: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      status: ['', Validators.required],
      createdAt: [''],
      createdAtTime: [''],
      updatedAt: [''],
      updatedAtTime: ['']
    });

    this.cvService.role$.subscribe(role => {
      this.role = role;
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const userSettingsMutation = gql`
      mutation CreateAllCompanySettings($data: [UserUpdateArgs!]!) {
        updateUsers(data: $data) {
          id
          firstName
          lastName
          role
          profilePicture
          email
          resume
          resumeCount
          status
          createdAt
          updatedAt
        }
      }
    `;

    this.apollo.mutate({
      mutation: userSettingsMutation,
      variables: { data: [this.userForm.value] }
    }).subscribe({
      next: (response: any) => {
        console.log('Signup successful:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Signup failed:', error);
        if (error.message.includes('Unique constraint failed on the fields: (`email`)')) {
          alert('This email is already in use. Please use another email.');
        } else {
          alert('An error occurred during signup. Please try again.');
        }
      }
    });
  }

  onProfilePictureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicturePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onResumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.resumeFile = input.files[0];
    }
  }
}

