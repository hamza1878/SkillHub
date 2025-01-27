import { Component } from '@angular/core';
import { CvService } from '../../cv.service';
import { CommonModule } from '@angular/common'; 

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
  styleUrl: './applications.component.css'  ,

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
  id: string | null | undefined;
  currentRole: any;
constructor(private cvService:CvService){}
  selectedCandidate: Candidate | null = null;
  ngOnInit(): void {
    this.cvService.id$.subscribe((id) => {
      this.id = localStorage.getItem("current_user");
      console.log('fsdefvsfv', id);
    });
    this.cvService.role$.subscribe((setRole) => {
      console.log(setRole)

      this.currentRole = setRole;
      this.currentRole = localStorage.getItem('current_role');

      console.log(this.currentRole)


    });
  }
  showDetails(candidate: Candidate) {
    this.selectedCandidate = candidate;
  
}}