import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { Url } from 'url';
import { MatSnackBar } from '@angular/material/snack-bar';  // Importer MatSnackBar

@Component({
  selector: 'app-compaines',
  standalone: false,
  
  templateUrl: './compaines.component.html',
  styleUrl: './compaines.component.css'
})
export class CompainesComponent {


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, 
      panelClass: ['bg-green-500', 'text-black', 'rounded-lg', 'p-4'], 
    });
  }
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
      more:'',
      logo: "/assets/tech-corp-logo.png" // Chemin de l'image du logo

    },
    {
      companyName: 'Green Solutions Ltd',
      jobTitle: 'Environmental Analyst',
      workTime: 'Full-time',
      salary: '$75,000/year',
      location: 'London, UK',
      more:'.',
      logo: "/assets/tech-corp-logo.png" // Chemin de l'image du logo


    },
    {
      companyName: 'HealthCare Systems',
      jobTitle: 'Registered Nurse',
      workTime: 'Full-time',
      salary: '$65,000/year',
      location: 'Los Angeles, USA',
      more:'.',
      logo: "/assets/tech-corp-logo.png" // Chemin de l'image du logo

    },
    {
      companyName: 'Global Enterprises',
      jobTitle: 'Marketing Manager',
      workTime: 'Part-time',
      salary: '$50,000/year',

      location: 'Toronto, Canada',
      more:'.',
      logo: "/assets/tech-corp-logo.png" // Chemin de l'image du logo

    },
    {
      companyName: 'FinTech Solutions',
      jobTitle: 'Financial Analyst',
      workTime: 'Full-time',
      salary: '$90,000/year',

      location: 'San Francisco, USA',
      more:'.',
      logo: "/assets/tech-corp-logo.png" // Chemin de l'image du logo

    },
    {
      companyName: 'Creative Agency',
      jobTitle: 'Graphic Designer',
      workTime: 'Full-time',
      salary: '$60,000/year',
      logo: "/assets/tech-corp-logo.png", // Chemin de l'image du logo

      more:'.',
      location: 'Berlin, Germany',
    },
    {
      companyName: 'Future Tech Ltd',
      jobTitle: 'Data Scientist',
      workTime: 'Remote',
      salary: '$110,000/year',
      location: 'Remote (Global)',
      more:'.',
      logo: "/assets/tech-corp-logo.png" // Chemin de l'image du logo

    },
    {
      companyName: 'Bright Innovations',
      jobTitle: 'HR Specialist',
      workTime: 'Full-time',
      salary: '$70,000/year',

      location: 'Sydney, Australia',
      more:'.',
      logo: "/assets/tech-corp-logo.png" // Chemin de l'image du logo

    },
    {
      companyName: 'Global Software Inc',
      jobTitle: 'Frontend Developer',
      workTime: 'Full-time',
      salary: '$95,000/year',
      location: 'Paris, France',
      more:'.',
      logo: "/assets/tech-corp-logo.png" // Chemin de l'image du logo

    },
    {
      companyName: 'Modern Logistics',
      jobTitle: 'Supply Chain Manager',
      workTime: 'Part-time',
      salary: '$60,000/year',
      location: 'Chicago, USA',
      more:'.',
      logo: "/assets/tech-corp-logo.png" // Chemin de l'image du logo

    },
  ];

  ngOnInit(): void {
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private snackBar: MatSnackBar) {}

}
interface Job {
  companyName: string;
  jobTitle: string;
  workTime: 'Full-time' | 'Part-time' | 'Remote';
  salary: string;
  location: string;
  more:string;
  logo:string;
}

