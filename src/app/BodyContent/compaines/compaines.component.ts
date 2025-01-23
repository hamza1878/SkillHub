import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo, gql } from 'apollo-angular';
import { CvService } from '../../cv.service';

interface Company {
  id: string;
  name: string;
  logo: {
    id: string;
    filesize: number;
    width: number;
    height: number;
    extension: string;
    url: string;
  };
  type: string;
  jobDomain: string;
  registrationNumber: string;
  foundingDate: string;
  headquarters: string;
  legalStatus: string;
  capital: string;
  revenue: string;
  createdAt: string;
  updatedAt: string;
  phone: string;
  email: string;
  linkdein: string;
}

interface CompaniesResponse {
  companies: Company[];
}

@Component({
  selector: 'app-compaines',
  standalone: false,
  templateUrl: './compaines.component.html',
  styleUrls: ['./compaines.component.css'],
})
export class CompainesComponent {
  companies: Company[] = [];
  loading: boolean = true;
  error: any;
  id: any;

  constructor(
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    private cvService: CvService
  ) {}
  ngOnInit(): void {
    this.cvService.id$.subscribe((id) => {
      this.id = localStorage.getItem("current_user");
      console.log('fsdefvsfv', id);
      this.fetchCompanies();
    });
  }
  fetchCompanies(): void {
    const CompanyProfile = gql`
     query Companies($where: CompanyWhereInput!) {
  companies(where: $where) {
    id
    user {
      id
      email
    }
    name
    logo {
      id
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

    this.apollo
      .watchQuery<CompaniesResponse>({
        query: CompanyProfile,
        variables: {
          where: {
            user: {
              id: {
                equals: this.id,
              },
            },
          },
        },
      })
      .valueChanges.subscribe({
        next: (result) => {
          this.companies = result?.data?.companies || [];
          this.loading = false;
        },
        error: (err) => {
          this.error = err;
          this.loading = false;
          this.snackBar.open('Error fetching companies data!', 'Close', {
            duration: 3000,
          });
        },
      });
  }
}
//import { Component } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Apollo, gql } from 'apollo-angular';
// import { CvService } from '../../cv.service';

// interface Company {
//   id: string;
//   name: string;
//   logo: {
//     id: string;
//     filesize: number;
//     width: number;
//     height: number;
//     extension: string;
//     url: string;
//   };
//   type: string;
//   jobDomain: string;
//   registrationNumber: string;
//   foundingDate: string;
//   headquarters: string;
//   legalStatus: string;
//   capital: string;
//   revenue: string;
//   createdAt: string;
//   updatedAt: string;
//   phone: string;
//   Email: string;
//   linkdein: string;
// }

// interface CompaniesResponse {
//   companies: Company[];
// }

// @Component({
//   selector: 'app-compaines',
//   standalone: false,
//   templateUrl: './compaines.component.html',
//   styleUrls: ['./compaines.component.css'],
// })
// export class CompainesComponent {

//   companies: Company[] = [];
//   loading: boolean = true;
//   error: any;
//   currentUserEmail: string | null = null;

//   constructor(
//     private apollo: Apollo,
//     private snackBar: MatSnackBar,
//     private cvService: CvService
//   ) {}

//   ngOnInit(): void {
//     this.cvService.id$.subscribe((email) => {
//       this.currentUserEmail = email;
//       console.log(email)
//       this.fetchCompanies();
//     });
//   }

//   fetchCompanies(): void {
//     if (!this.currentUserEmail) {
//       this.snackBar.open('User email not found!', 'Close', {
//         duration: 3000,
//       });
//       return;
//     }

//     // Requête GraphQL avec une variable pour filtrer par email
//     const GET_COMPANIES = gql`
//       query GetCompanies($email: String!) {
//         companies(filter: { Email: $email }) {
//           id
//           name
//           logo {
//             id
//             filesize
//             width
//             height
//             extension
//             url
//           }
//           type
//           jobDomain
//           registrationNumber
//           foundingDate
//           headquarters
//           legalStatus
//           capital
//           revenue
//           createdAt
//           updatedAt
//           phone
//           Email
//           linkdein
//         }
//       }
//     `;

//     // Envoyer la requête avec la variable email
//     this.apollo
//       .watchQuery<CompaniesResponse>({
//         query: GET_COMPANIES,
//         variables: { email: this.currentUserEmail },
//       })
//       .valueChanges.subscribe({
//         next: (result) => {
//           this.companies = result?.data?.companies || [];
//           this.loading = false;
//         },
//         error: (err) => {
//           this.error = err;
//           this.loading = false;
//           this.snackBar.open('Error fetching companies data!', 'Close', {
//             duration: 3000,
//           });
//         },
//       });
//   }
// }
