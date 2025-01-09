import { Component } from '@angular/core';
import { CvService } from '../../cv.service';

@Component({
  selector: 'app-cv3',
  standalone: false,
  
  templateUrl: './cv3.component.html',
  styleUrl: './cv3.component.css'
})
export class Cv3Component {


 cvData: any = {
    personalInfo: { firstName: '', lastName: '', email: '', phone: '' },
    professionalSummary: '',
    educationPrinciple: [],
    experiences: [],
    projects: [],
    certifications: [],
    imagePreview: null
  };

  constructor(private cvService: CvService) {}

  ngOnInit() {
    this.cvService.cvData$.subscribe(data => {
      if (data) {
        console.log('CV Data received:', data);
        this.cvData = {...data};
        
        this.cvData.educationPrinciple = data.educationPrinciple || [];
        this.cvData.experiences = data.experiences || [];
        this.cvData.projects = data.projects || [];
        this.cvData.certifications = data.certifications || [];
      }
    });
  }

}

