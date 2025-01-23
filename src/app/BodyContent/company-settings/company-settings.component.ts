import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { CvService } from '../../cv.service';

@Component({
  selector: 'app-company-settings',
  standalone:false,
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.css'],
})
export class CompanySettings implements OnInit {
 CompanyInformation!: FormGroup;
  logoPreview: string | ArrayBuffer | null = null;
  role: any;
  userId: string | null | undefined; // ID de l'utilisateur
  companyId: string | null | undefined; // ID de l'entreprise

  constructor(
    private fb: FormBuilder,
    private readonly apollo: Apollo,
    private cvService: CvService
  ) {}

  ngOnInit(): void {
    // Récupère l'ID de l'utilisateur connecté
    this.cvService.id$.subscribe((id) => {
      this.userId = localStorage.getItem("current_user");
      console.log('User ID:', this.userId);

      // Récupère l'ID de l'entreprise associée à l'utilisateur
      this.fetchCompanyId(this.userId);
      this.fetchCompanyd(this.userId)
    });

    // Initialise le formulaire
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
      brandIdentity: [''],
      phone: [''],
      linkdein: [''],
    });
  }

  // Récupère l'ID de l'entreprise associée à l'utilisateur
  fetchCompanyId(userId: string | null): void {
    if (!userId) {
      console.error('❌ Aucun utilisateur connecté');
      return;
    }

    this.apollo
  .query<GetCompanyByUserResponse>({
    query: gql`
      query GetCompanyByUser($userId: ID!) {
        companies(where: { user: { id: { equals: $userId } } }) {
          id
        }
      }
    `,
    variables: {
      userId,
    },
  })
  .subscribe({
    next: (response) => {
      const companyId = response.data?.companies[0]?.id; // TypeScript valide maintenant cette ligne
      if (companyId) {
        this.companyId = companyId;
        console.log('Company ID:', this.companyId);
      } else {
        console.error('❌ Aucune entreprise trouvée pour cet utilisateur');
      }
    },
    error: (error) => {
      console.error('❌ Erreur lors de la récupération de l\'entreprise:', error);
    },
  });
  }

  // Gère le changement de logo
  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
        this.CompanyInformation.patchValue({ logo: file });
      };
      reader.readAsDataURL(file);
    }
  }

  // Met à jour l'entreprise
  update(): void {
    if (!this.companyId) {
      console.error('❌ ID de l\'entreprise manquant');
      return;
    }

    const formData = this.CompanyInformation.value;

    const updateCompany = gql`
      mutation UpdateCompany($where: CompanyWhereUniqueInput!, $data: CompanyUpdateInput!) {
        updateCompany(where: $where, data: $data) {
          id
          user {
            id
          }
          name
          logo {
            id
            filesize
            width
            height
            extension
            url
          }
          IndustryType
          type
          jobDomain
          registrationNumber
          foundingDate
          headquarters
          legalStatus
          capital
          revenue
          industry
          businessModel
          mission
          vision
          phone
          linkdein
          createdAt
          updatedAt
        }
      }
    `;

    console.log('Form Data:', formData);

    this.apollo
      .mutate({
        mutation: updateCompany,
        variables: {
          where: {
            id: this.companyId, // Utilise l'ID de l'entreprise récupéré
          },
          data: {
            name: formData.name,
            logo: formData.logo ? { upload: formData.logo } : null, // Gère le logo comme ImageFieldInput
            type: "EURL", // Remplacez par une valeur valide de l'enum
            jobDomain: formData.jobDomain,
            registrationNumber: formData.registrationNumber,
            foundingDate: formData.foundingDate ? new Date(formData.foundingDate).toISOString() : null, // Convertit en ISO 8601
            headquarters: formData.headquarters,
            legalStatus: formData.legalStatus,
            capital: parseInt(formData.capital, 10) || 0, // Convertit en entier
            revenue: parseInt(formData.revenue, 10) || 0, // Convertit en entier
            industry: formData.industry,
            businessModel: formData.businessModel,
            mission: formData.mission,
            vision: formData.vision,
            phone: formData.phone,
            linkdein: formData.linkdein,
          },
        },
      })
      .subscribe({
        next: (response) => {
          console.log('✅ Entreprise mise à jour avec succès:', response);
        },
        error: (error) => {
          console.error('❌ Erreur lors de la mise à jour de l\'entreprise:', error);
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
  // Récupère l'ID de l'entreprise associée à l'utilisateur
fetchCompanyd(userId: string | null): void {
  if (!userId) {
    console.error('❌ Aucun utilisateur connecté');
    return;
  }

  this.apollo
    .query<GetCompanyByUserResponse>({
      query: gql`
        query GetCompanyByUser($userId: ID!) {
          companies(where: { user: { id: { equals: $userId } } }) {
            id
          }
        }
      `,
      variables: {
        userId,
      },
    })
    .subscribe({
      next: (response) => {
        const companyId = response.data?.companies[0]?.id;
        if (companyId) {
          this.companyId = companyId;
          console.log('Company ID:', this.companyId);

          // Récupérer les données de l'entreprise
          this.fetchCompanyData(this.companyId);
        } else {
          console.error('❌ Aucune entreprise trouvée pour cet utilisateur');
        }
      },
      error: (error) => {
        console.error('❌ Erreur lors de la récupération de l\'entreprise:', error);
      },
    });
}

// Récupère les données de l'entreprise et les remplit dans le formulaire
fetchCompanyData(companyId: string): void {
  this.apollo
    .query({
      query: gql`
        query GetCompanyData($companyId: ID!) {
          company(where: { id: $companyId }) {
            name
            logo {
              url
            }
            type
            jobDomain
            registrationNumber
            foundingDate
            headquarters
            legalStatus
            capital
            revenue
            industry
            businessModel
            mission
            vision
            phone
            linkdein
          }
        }
      `,
      variables: {
        companyId,
      },
    })
    .subscribe({
      next: (response: any) => {
        const company = response.data?.company;

        if (company) {
          // Remplit le formulaire avec les données de l'entreprise
          this.CompanyInformation.patchValue({
            name: company.name,
            logo: company.logo?.url || '',
            type: company.type,
            jobDomain: company.jobDomain,
            registrationNumber: company.registrationNumber,
            foundingDate: company.foundingDate
              ? new Date(company.foundingDate).toISOString().substring(0, 10)
              : '', // Format ISO pour les inputs date
            headquarters: company.headquarters,
            legalStatus: company.legalStatus,
            capital: company.capital,
            revenue: company.revenue,
            industry: company.industry,
            businessModel: company.businessModel,
            mission: company.mission,
            vision: company.vision,
            phone: company.phone,
            linkdein: company.linkdein,
          });

          if (company.logo?.url) {
            this.logoPreview = company.logo.url; // Prévisualisation du logo
          }
        } else {
          console.error('❌ Aucune donnée de l\'entreprise trouvée');
        }
      },
      error: (error) => {
        console.error('❌ Erreur lors de la récupération des données de l\'entreprise:', error);
      },
    });
}

}
interface GetCompanyByUserResponse {
  companies: {
    id: string;
  }[];
}