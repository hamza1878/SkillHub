import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CvService } from '../../cv.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-findjob',
  standalone: false,
  
  templateUrl: './findjob.component.html',
  styleUrl: './findjob.component.css',
    
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
    "Tourism and Leisure"
  ];

  jobs: Job[] = [
    {
      companyName: 'Tech Innovators Inc',
      jobTitle: 'Software Developer',
      workTime: 'Full-time',
      salary: '$85,000/year',
      location: 'New York, USA',
      description: 'Crafting a compelling job description is essential to helping you attract the most qualified candidates for your job.',
      logo: '/assets/CHRIKA.jpg',
      email: 'hr@techinnovators.com',
      linkedin: 'https://www.linkedin.com/company/tech-innovators-inc',
      Category: 'Engineering and Technical',
    },
    {
      companyName: 'Green Energy Solutions',
      jobTitle: 'Project Manager',
      workTime: 'Part-time',
      salary: '$60,000/year',
      location: 'San Francisco, USA',
      description: 'Lead renewable energy projects and work with a passionate team dedicated to sustainability.',
      logo: '/assets/green-energy-logo.png',
      email: 'careers@greenenergy.com',
      linkedin: 'https://www.linkedin.com/company/green-energy-solutions',
      Category: 'Renewable Energy',
    },
    {
      companyName: 'HealthCare Heroes',
      jobTitle: 'Nurse Practitioner',
      workTime: 'Full-time',
      salary: '$95,000/year',
      location: 'Austin, USA',
      description: 'Join our healthcare team to provide exceptional care and improve patient outcomes.',
      logo: '/assets/healthcare-heroes-logo.jpg',
      email: 'jobs@healthcareheroes.org',
      linkedin: 'https://www.linkedin.com/company/healthcare-heroes',
      Category: 'Healthcare',
    },
    {
      companyName: 'EduTech Revolution',
      jobTitle: 'Instructional Designer',
      workTime: 'Remote',
      salary: '$70,000/year',
      location: 'Remote',
      description: 'Design innovative educational materials for online learning platforms.',
      logo: '/assets/edutech-logo.png',
      email: 'jobs@edutech.com',
      linkedin: 'https://www.linkedin.com/company/edutech-revolution',
      Category: 'Education and Training',
    },
    {
      companyName: 'Global Marketing Experts',
      jobTitle: 'Marketing Specialist',
      workTime: 'Remote',
      salary: '$50,000/year',
      location: 'London, UK',
      description: 'Develop and execute marketing strategies to increase brand awareness and engagement.',
      logo: '/assets/global-marketing-logo.png',
      email: 'recruitment@globalmarketing.com',
      linkedin: 'https://www.linkedin.com/company/global-marketing-experts',
      Category: 'Marketing and Advertising',
    },
    // Ajoutez plus de jobs ici...
  ];
  

  filteredJobs: Job[] = [];
  jobTitle: string = '';
  location: string = '';
  selected: string = '';
  shows: boolean = true;

  modalJob: Job = {
    companyName: '',
    jobTitle: '',
    workTime: 'Full-time',
    salary: '',
    location: '',
    description: '',
    logo: '',
    email: '',
    linkedin: '',
    Category: ''
  };
  showModal: boolean = false;
  showModalApply: boolean = false;
  modalapply!: FormGroup;
searsh: any;

  constructor(
    private cvService: CvService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.modalapply = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      description: [''],
      linkedin: [''],
      resumes: [''],
      phoneNumber: [''],
      github: ['']
    });
  }
  serach=true
  rechercher(jobTitle: string, location: string, selected: string): void {
    this.shows = true;
    this.serach=false
    this.filteredJobs = this.jobs.filter(job => {
      const matchesTitle = job.jobTitle.toLowerCase().includes(jobTitle.toLowerCase());
      const matchesLocation = job.location.toLowerCase().includes(location.toLowerCase());
      const matchesCategory = selected ? job.Category === selected : true;

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

  onSubmit(): void {
    if (this.modalapply.valid) {
      this.cvService.apply(this.modalapply.value);
      this.snackBar.open('Application submitted successfully!', 'Close', {
        duration: 5000,
        panelClass: ['bg-green-500', 'text-black', 'rounded-lg', 'p-4']
      });
      this.closeModalApply();
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 5000,
        panelClass: ['bg-red-500', 'text-white', 'rounded-lg', 'p-4']
      });
    }
  }
}

interface Job {
  companyName: string;
  jobTitle: string;
  workTime: 'Full-time' | 'Part-time' | 'Remote';
  salary: string;
  location: string;
  description: string;
  logo: string;
  email: string;
  linkedin: string;
  Category: string;
}