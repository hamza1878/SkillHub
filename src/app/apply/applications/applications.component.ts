import { Component } from '@angular/core';
interface Candidate {
  name: string;
  position: string;
  date: string;
  status: string;
}
@Component({
  selector: 'app-applications',
  standalone: false,
  
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})

export class ApplicationsComponent {
  formData: { name: string; email: string; phone: string; resume: File | null, } = {
    name: '',
    email: '',
    phone: '',
    resume: null,
  };
  posts!:boolean
  
  candidates: Candidate[] = [
    { name: 'Jean Dupont', position: 'Développeur Web', date: '2023-10-01', status: 'Nouveau', },
    { name: 'Marie Martin', position: 'Designer Graphique', date: '2023-09-28', status: 'En revue', },
    { name: 'Marie Martin', position: 'Designer Graphique', date: '2023-09-28', status: 'En revue', },

  ];

  selectedCandidate: Candidate | null = null;

  showDetails(candidate: Candidate) {
    this.selectedCandidate = candidate;
  
}}