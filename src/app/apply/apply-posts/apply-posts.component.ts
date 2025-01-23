import { Component } from '@angular/core';

@Component({
  selector: 'app-apply-posts',
  standalone: false,
  
  templateUrl: './apply-posts.component.html',
  styleUrl: './apply-posts.component.css'
})
export class ApplyPostsComponent {

  job = {
    companyName: '',
    jobTitle: '',
    location: '',
    workTime: '',
    salary: '',
    description: '',
  };
  success = false;

  onSubmit() {
    console.log('Job Posted:', this.job);
    this.success = true;
    setTimeout(() => (this.success = false), 3000); // Hide success message after 3 seconds
  }
}
