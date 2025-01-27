import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { CvService } from '../../cv.service';


export interface Job {
  companyName: string;
  jobTitle: string;
  worktime: string;
  salary: string;
  location: string;
  description: string;
  logo: { url: string };
  email: string;
  linkedin: string;
  Category: string;
  selected: string;
  title: string;
  id: string;
}


const APPLY_FOR_JOB = gql`
mutation CreateJobApplication($data: [JobApplicationCreateInput!]!) {
  createJobApplications(data: $data) {
    applicationDate
    description
    firstName
    email
    github
    id
    jobPosting {
      id
    }
    lastName
    linkedin
    phoneNumber
    resume {
      filename
      url
      filesize
    }
    status
  }
}
`;

const GET_USER = gql`
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
      firstName
      email
      github
      id
      lastName
      linkedin
      phone
      
    }
  }
`;

@Component({
  selector: 'app-findjob',
  templateUrl: './findjob.component.html',
  styleUrls: ['./findjob.component.css'],
  standalone: false
})
export class FindjobComponent implements OnInit {
  jobCategories: string[] = [
    "Information Technology and Telecommunications",
    "Engineering and Technical",
    "Marketing and Communication",
    "Sales and Business Development",
    "Administration and Management",
    "Human Resources",
    "Finance and Accounting",
    "Healthcare and Medical",
    "Education and Training",
    "Craftsmanship and Arts",
    "Transportation and Logistics",
    "Construction and Public Works",
    "Agriculture and Environment",
    "Hospitality and Catering",
    "Legal and Law",
    "Energy and Environment",
    "Manufacturing and Production",
    "Research and Development",
    "Personal Services",
    "Security and Defense",
    "Media and Broadcasting",
    "Real Estate",
    "Fashion and Luxury",
    "Tourism and Leisure",
  ];

  filteredJobs: Job[] = [];
  modalJob: Job = {
    companyName: '',
    jobTitle: '',
    worktime: '',
    salary: '',
    location: '',
    description: '',
    logo: { url: '' },
    id: '',
    email: '',
    linkedin: '',
    Category: '',
    selected: '',
    title: '',
  };

  showModal: boolean = false;
  showModalApply: boolean = false;
  modalapply!: FormGroup;

  searchTitle: string = '';
  searchLocation: string = '';
  searchCategory: string = '';
  
  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cvService: CvService
  ) {}

  ngOnInit(): void {
    this.modalapply = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      description: ['', Validators.required],
      linkedin: [''],
      email:[''],
      github: [''],
      resumes: [null],
    });

    const userId = localStorage.getItem('current_user');
    if (userId) {
      this.fetchUserData(userId);
    }

    this.fetchJobPostings();
  }

  fetchUserData(userId: string): void {
    this.apollo
      .watchQuery({
        query: GET_USER,
        variables: { where: { id: userId } },
      })
      .valueChanges.subscribe(
        (result: any) => {
          const user = result?.data?.user;
          if (user) {
            this.modalapply.patchValue({
              firstName: user.firstName,
              lastName: user.lastName,
              phoneNumber: user.phone,
              email: user.email,
              description: '',
              linkedin: user.linkedin,
              github: user.github,
            });
          }
        },
        (error) => {
          console.error('Error fetching user data:', error);
          this.snackBar.open('Error fetching user data', 'Close', { duration: 3000 });
        }
      );
  }

  fetchJobPostings(): void {
    this.apollo
      .watchQuery({
        query: this.getJobsQuery,
      })
      .valueChanges.subscribe((result: any) => {
        if (result?.data?.jobPostings) {
          this.filteredJobs = result.data.jobPostings.map((job: any) => ({
            ...job,
            logo: job.logo ? { url: job.logo.url } : null,
          }));
        }
      });
  }

  filterJobs(): void {
    this.filteredJobs = this.filteredJobs.filter((job: Job) => {
      const matchesTitle = job.companyName
        .toLowerCase()
        .includes(this.searchTitle.toLowerCase());
      const matchesLocation = job.location
        .toLowerCase()
        .includes(this.searchLocation.toLowerCase());
      const matchesCategory =
        this.searchCategory === '' || job.Category.toLowerCase() === this.searchCategory.toLowerCase();
      return matchesTitle && matchesLocation && matchesCategory;
    });
  }

  openModal(job: Job): void {
    this.modalJob = job;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  applyModalOpen(): void {
    this.showModalApply = true;
  }

  closeModalApply(): void {
    this.showModalApply = false;
  }

  onSubmitApplication(): void {
    if (this.modalapply.valid) {
      const applicationData = this.modalapply.value;
      const { firstName, lastName, phoneNumber, description, linkedin, github, resumes, email } = applicationData;
  
      let resumeFile = null;
      if (resumes && resumes[0]) {
        resumeFile = resumes[0]; // Get the actual file object from the file input
      }
  
      this.apollo
        .mutate({
          mutation: APPLY_FOR_JOB,
          variables: {
            data: {
              firstName,
              lastName,
              phoneNumber,
              description,
              linkedin,
              github,
              email,
              resumes: resumes,  
              jobPosting: {
                connect: {
                  id: this.modalJob.id,
                },
              },
            },
          },
        })
        .subscribe({
          next: (_result) => {
            this.snackBar.open('Application submitted successfully!', 'Close', {
              duration: 5000,
              panelClass: ['bg-green-500', 'text-black', 'rounded-lg', 'p-4'],
            });
            this.closeModalApply(); // Close the apply modal after submission
          },
          error: (err) => {
            console.error('Error submitting application:', err);
            this.snackBar.open('Error submitting your application', 'Close', {
              duration: 5000,
              panelClass: ['bg-red-500', 'text-white', 'rounded-lg', 'p-4'],
            });
          },
        });
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 5000,
        panelClass: ['bg-red-500', 'text-white', 'rounded-lg', 'p-4'],
      });
    }
  }
  
  getJobsQuery = gql`
    query JobPosting {
      jobPostings {
        company {
          businessModel
        }
        description
        expiresAt
        location
        postedAt
        salary
        status
        updatedAt
        createdAt
        id
        companyName
        jobTitle
        logo {
          id
          filesize
          width
          height
          extension
          url
        }
        worktime
      }
    }
  `;
}


// export class FindjobComponent implements OnInit {
//   jobCategories: string[] = [
//     "Information Technology and Telecommunications",
//     "Engineering and Technical",
//     "Marketing and Communication",
//     "Sales and Business Development",
//     "Administration and Management",
//     "Human Resources",
//     "Finance and Accounting",
//     "Healthcare and Medical",
//     "Education and Training",
//     "Craftsmanship and Arts",
//     "Transportation and Logistics",
//     "Construction and Public Works",
//     "Agriculture and Environment",
//     "Hospitality and Catering",
//     "Legal and Law",
//     "Energy and Environment",
//     "Manufacturing and Production",
//     "Research and Development",
//     "Personal Services",
//     "Security and Defense",
//     "Media and Broadcasting",
//     "Real Estate",
//     "Fashion and Luxury",
//     "Tourism and Leisure"
//   ];

//   jobs: Job[] = [
//     {
//       companyName: 'Tech Innovators Inc',
//       jobTitle: 'Software Developer',
//       workTime: 'Full-time',
//       salary: '$85,000/year',
//       location: 'New York, USA',
//       description: 'Crafting a compelling job description is essential to helping you attract the most qualified candidates for your job.',
//       logo: '/assets/CHRIKA.jpg',
//       email: 'hr@techinnovators.com',
//       linkedin: 'https://www.linkedin.com/company/tech-innovators-inc',
//       Category: 'Engineering and Technical',
//     },
//     {
//       companyName: 'Green Energy Solutions',
//       jobTitle: 'Project Manager',
//       workTime: 'Part-time',
//       salary: '$60,000/year',
//       location: 'San Francisco, USA',
//       description: 'Lead renewable energy projects and work with a passionate team dedicated to sustainability.',
//       logo: '/assets/green-energy-logo.png',
//       email: 'careers@greenenergy.com',
//       linkedin: 'https://www.linkedin.com/company/green-energy-solutions',
//       Category: 'Renewable Energy',
//     },
//     {
//       companyName: 'HealthCare Heroes',
//       jobTitle: 'Nurse Practitioner',
//       workTime: 'Full-time',
//       salary: '$95,000/year',
//       location: 'Austin, USA',
//       description: 'Join our healthcare team to provide exceptional care and improve patient outcomes.',
//       logo: '/assets/healthcare-heroes-logo.jpg',
//       email: 'jobs@healthcareheroes.org',
//       linkedin: 'https://www.linkedin.com/company/healthcare-heroes',
//       Category: 'Healthcare',
//     },
//     {
//       companyName: 'EduTech Revolution',
//       jobTitle: 'Instructional Designer',
//       workTime: 'Remote',
//       salary: '$70,000/year',
//       location: 'Remote',
//       description: 'Design innovative educational materials for online learning platforms.',
//       logo: '/assets/edutech-logo.png',
//       email: 'jobs@edutech.com',
//       linkedin: 'https://www.linkedin.com/company/edutech-revolution',
//       Category: 'Education and Training',
//     },
//     {
//       companyName: 'Global Marketing Experts',
//       jobTitle: 'Marketing Specialist',
//       workTime: 'Remote',
//       salary: '$50,000/year',
//       location: 'London, UK',
//       description: 'Develop and execute marketing strategies to increase brand awareness and engagement.',
//       logo: '/assets/global-marketing-logo.png',
//       email: 'recruitment@globalmarketing.com',
//       linkedin: 'https://www.linkedin.com/company/global-marketing-experts',
//       Category: 'Marketing and Advertising',
//     },
//     // Ajoutez plus de jobs ici...
//   ];
  

//   filteredJobs: Job[] = [];
//   jobTitle: string = '';
//   location: string = '';
//   selected: string = '';
//   shows: boolean = true;

//   modalJob: Job = {
//     companyName: '',
//     jobTitle: '',
//     workTime: 'Full-time',
//     salary: '',
//     location: '',
//     description: '',
//     logo: '',
//     email: '',
//     linkedin: '',
//     Category: ''
//   };
//   showModal: boolean = false;
//   showModalApply: boolean = false;
//   modalapply!: FormGroup;
// searsh: any;

//   constructor(
//     private cvService: CvService,
//     private fb: FormBuilder,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.modalapply = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       description: [''],
//       linkedin: [''],
//       resumes: [''],
//       phoneNumber: [''],
//       github: ['']
//     });
//   }
//   serach=true
//   rechercher(jobTitle: string, location: string, selected: string): void {
//     this.shows = true;
//     this.serach=false
//     this.filteredJobs = this.jobs.filter(job => {
//       const matchesTitle = job.jobTitle.toLowerCase().includes(jobTitle.toLowerCase());
//       const matchesLocation = job.location.toLowerCase().includes(location.toLowerCase());
//       const matchesCategory = selected ? job.Category === selected : true;

//       return matchesTitle && matchesLocation && matchesCategory;
//     });
//   }

//   openModal(job: Job): void {
//     this.modalJob = job;
//     this.showModal = true;
//   }

//   closeModal(): void {
//     this.showModal = false;
//   }

//   applyModalOpen(): void {
//     this.showModalApply = true;
//   }

//   closeModalApply(): void {
//     this.showModalApply = false;
//   }

//   onSubmit(): void {
//     if (this.modalapply.valid) {
//       this.cvService.apply(this.modalapply.value);
//       this.snackBar.open('Application submitted successfully!', 'Close', {
//         duration: 5000,
//         panelClass: ['bg-green-500', 'text-black', 'rounded-lg', 'p-4']
//       });
//       this.closeModalApply();
//     } else {
//       this.snackBar.open('Please fill out all required fields.', 'Close', {
//         duration: 5000,
//         panelClass: ['bg-red-500', 'text-white', 'rounded-lg', 'p-4']
//       });
//     }
//   }
// }

