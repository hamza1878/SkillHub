import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql, Mutation } from 'apollo-angular';
import { CvService } from '../../cv.service';

@Component({
  selector: 'app-company-settings',
  standalone: false,
  
  templateUrl: './company-settings.component.html',
  styleUrl: './company-settings.component.css'
})
export class CompanySettings{

  CompanyInformation!: FormGroup;
  logoPreview: string | ArrayBuffer | null = null;
  role: any;


  constructor(private fb: FormBuilder, private readonly apollo: Apollo, private cvService: CvService) {}

  ngOnInit(): void {
    this.cvService.role$.subscribe(role => {
      this.role = role;
    });

    this.CompanyInformation = this.fb.group({
      name: ['', Validators.required],
      logo: [''],
      tagline: [''],
      type: ['', Validators.required],
      jobDomain: ['', Validators.required],
      registrationNumber: [''],
      taxId: [''],
      foundingDate: [''],
      headquarters: [''],
      legalStatus: [''],
      capital: [''],
      revenue: [''],
      industry: [''],
      businessModel: ['', Validators.required],
      mission: [''],
      vision: [''],
      jobApplications: [''],
      brandIdentity: ['']

      
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
    });
  }

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    // if (this.CompanyInformation.valid) {
    //   const formData = this.CompanyInformation.value;

    //   this.apollo.mutate<Mutation>({
    //     mutation: this.COMPANY,
    //     variables: {
    //       data: [{
    //         ...formData,
    //         logo: this.logoPreview 
    //       }]
    //     }
    //   }).subscribe({
    //     next: ({ data }) => {
    //       console.log('Company added:', data);
    //       alert('Company added successfully!');
    //     },
    //     error: (error) => {
    //       console.error('Error while adding company:', error);
    //       alert('An error occurred while submitting the form.');
    //     }
    //   });
    // } else {
    //   alert('Please fill out all required fields.');
    // }
  }
}
  