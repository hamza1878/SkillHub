import { Component, ViewChild, OnInit } from '@angular/core';
import { ResponseFormComponent } from '../response-form/response-form.component'; 
import { JobApplicationService } from '../../job-application.service';

interface Candidate {
  name: string;
  position: string;
  date: string;
  status: string;
  etat: string;
}

@Component({
  selector: 'app-bodycomp',
  templateUrl: './bodycomp.component.html',
  styleUrls: ['./bodycomp.component.css'],
  standalone: false
})
export class BodycompComponent implements OnInit {
  candidates: Candidate[] = [
    { name: 'Jean Dupont', position: 'Développeur Web', date: '2023-10-01', status: 'Nouveau', etat: 'accepted' },
    { name: 'Marie Martin', position: 'Designer Graphique', date: '2023-09-28', status: 'En revue', etat: 'enatt' },
  ];

  selectedCandidate: Candidate | null = null;
  res = true;

  @ViewChild(ResponseFormComponent) responseForm!: ResponseFormComponent;

  applicationData: string = '';
  applications: any[] = [];

  constructor(private jobApplicationService: JobApplicationService) {}

  ngOnInit(): void {
    this.applications = this.jobApplicationService.getApplyJob();
    console.log('404'+this.applications);
  }

  showDetails(candidate: Candidate): void {
    this.selectedCandidate = candidate;
  }

  onApply(): void {
    if (this.applicationData) {
      this.jobApplicationService.apply(this.applicationData);
      this.applicationData = '';
    } else {
      alert('Please enter application data');
    }
  }

  checkCandidateStatus(candidate: Candidate): boolean {
    if (candidate.etat != 'accepted') {
      return this.res = false;
    } else {
      return this.res = true;
    }
  }
  
  respondToCandidate(): void {
    if (this.selectedCandidate && this.selectedCandidate.etat === 'accepted') {
      this.res = false;
    } else {
      this.res = true;
    }
  }
}
