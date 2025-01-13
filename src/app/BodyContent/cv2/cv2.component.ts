import { Component, Input } from '@angular/core';
import { CvService } from '../../cv.service';

@Component({
  selector: 'app-cv2',
  standalone: false,
  
  templateUrl: './cv2.component.html',
  styleUrl: './cv2.component.css'
})
export class Cv2Component {
  @Input() 

 cvData: any = {
  personalInfo: { firstName: '', lastName: '', email: '', phone: '',linkedin:'',
  },    professionalSummary: '',
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

