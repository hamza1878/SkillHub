import { Component } from '@angular/core';
import { CvService } from '../../cv.service';

@Component({
  selector: 'app-cv1',
  standalone: false,
  
  templateUrl: './cv1.component.html',
  styleUrl: './cv1.component.css'
})
export class Cv1Component {
 cvData: any = {
  personalInfo: { firstName: '', lastName: '', email: '', phone: '',linkedin:'',
  },
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



