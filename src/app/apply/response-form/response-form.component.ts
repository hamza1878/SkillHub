import { Component } from '@angular/core';
import { JobApplicationService } from '../../job-application.service';

@Component({
  selector: 'app-response-form',
  templateUrl: './response-form.component.html',
  standalone: false
})
export class ResponseFormComponent {
  responseType: string = '';
  message: string = '';
  applicationData: any = [];
  applications: any[] = [];

  constructor(private jobApplicationService: JobApplicationService,) {
this.applicationData= this.jobApplicationService.getApplyJob()}
  ngOnInit(): void {
    this.applications = this.jobApplicationService.getApplyJob(); 
    alert(this.applications)

  }

  submitResponse() {
    if (this.responseType || this.applicationData) {
      const candidate = this.applications.find((app) => app.name === this.applicationData);
      alert(candidate)
      
      if (candidate) {
        this.jobApplicationService.responseType(candidate, this.responseType);
        
        alert(`Response: ${this.responseType}\nMessage: ${this.message}`);
      } else {
        alert('Candidate not found');
      }
    } 
  }
}
