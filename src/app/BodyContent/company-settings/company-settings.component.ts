import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql, Mutation } from 'apollo-angular';

@Component({
  selector: 'app-company-settings',
  standalone: false,
  
  templateUrl: './company-settings.component.html',
  styleUrl: './company-settings.component.css'
})
export class CompanySettings{


  CompanyInformation!: FormGroup;
  logoPreview: string | ArrayBuffer | null = null;

  COMPANY = gql`
    mutation AddCompany(
      $name: String!
      $tagline: String
      $jobDomain: String
      $registrationNumber: String
      $taxId: String
      $foundingDate: String
      $headquarters: String
      $legalStatus: String
      $capital: Float
      $revenue: Float
      $industry: String
      $businessModel: String!
      $mission: String
      $vision: String
      $brandIdentity: String
    ) {
      addCompany(
        name: $name
        tagline: $tagline
        jobDomain: $jobDomain
        registrationNumber: $registrationNumber
        taxId: $taxId
        foundingDate: $foundingDate
        headquarters: $headquarters
        legalStatus: $legalStatus
        capital: $capital
        revenue: $revenue
        industry: $industry
        businessModel: $businessModel
        mission: $mission
        vision: $vision
        brandIdentity: $brandIdentity
      ) {
        id
        name
        tagline
        businessModel
      }
    }
  `;

  constructor(private fb: FormBuilder, private readonly apollo: Apollo) {}

  ngOnInit(): void {
    this.CompanyInformation = this.fb.group({
      name: ['', Validators.required],
      logo: [''],
      tagline: [''],
      type: ['', Validators.required],
      jobDomain: ['', Validators.required],
      registrationNumber: [''],
      taxId: [''],
      foundingDate: [''],
      foundingDateTime: [''],
      headquarters: [''],
      legalStatus: [''],
      capital: [''],
      revenue: [''],
      industry: [''],
      businessModel: ['', Validators.required],
      mission: [''],
      vision: [''],
      jobApplications:[''],
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
role='Company'
  onSubmit(): void {
    if (this.CompanyInformation.valid) {
      const formData = this.CompanyInformation.value;

      this.apollo.mutate<Mutation>({
        mutation: this.COMPANY,
        variables: {
          name: formData.name,
          tagline: formData.tagline,
          jobDomain: formData.jobDomain,
          registrationNumber: formData.registrationNumber,
          taxId: formData.taxId,
          foundingDate: formData.foundingDate,
          headquarters: formData.headquarters,
          legalStatus: formData.legalStatus,
          capital: parseFloat(formData.capital) || 0,
          revenue: parseFloat(formData.revenue) || 0,
          industry: formData.industry,
          businessModel: formData.businessModel,
          mission: formData.mission,
          vision: formData.vision,
          brandIdentity: formData.brandIdentity
        }
      }).subscribe(
        ({ data }) => {
          console.log('Company added:', data);
          alert('Company added successfully!');
        },
        (error) => {
          console.error('Error while adding company:', error);
          alert('An error occurred while submitting the form.');
        }
      );
    } else {
      console.log('Form is not valid');
      alert('Please fill out all required fields.');
    }
  }
}