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
    imagePreview: null,
    skills: [],

  };
color='blue-500';
colors='blue-500';

  constructor(private cvService: CvService) {}

  ngOnInit() {
    this.cvService.cvData$.subscribe(data => {
      if (data) {
        console.log('CV Data received:', data);
        this.cvData = { ...data };
        this.cvData.skills = data.skills || [];
      }
        this.cvService.color$.subscribe((color) => {
      this.color = color || 'blue-500';
      console.log('Received color:', color);
    });
    });
    this.cvService.cvData$.subscribe(data => {
      if (data) {
        console.log('CV Data received:', data);
        this.cvData = {...data};
        
        this.cvData.educationPrinciple = data.educationPrinciple || [];
        this.cvData.experiences = data.experiences || [];
        this.cvData.projects = data.projects || [];
        this.cvData.skills = data.skills || [];

        this.cvData.certifications = data.certifications || [];
      }
    });
  }

}

