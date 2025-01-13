import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-settings',
  standalone: false,
  
  templateUrl: './users-settings.component.html',
  styleUrl: './users-settings.component.css'
})
export class UsersSettings  implements OnInit {

  userForm!: FormGroup 
  profilePicturePreview: string | ArrayBuffer | null = null;
  resumeFile: File | null = null;

  constructor(private fb: FormBuilder) {}

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

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = new FormData();
      Object.keys(this.userForm.controls).forEach(key => {
        formData.append(key, this.userForm.get(key)?.value);
      });
      if (this.resumeFile) {
        formData.append('resumeFile', this.resumeFile);
      }
      console.log(formData);
    } else {
      console.log('Form is not valid');
    }
  }
}
