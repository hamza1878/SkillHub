import { Component, Input } from '@angular/core';

interface Candidate {
  name: string;
  position: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-candidate-res',
  templateUrl: './candidate-res.component.html',
  standalone:false,
})
export class CandidateDetailsComponent {
  applications = [
    { id: 1, jobTitle: 'Développeur Web', company: 'TechCorp', contact: 'contact@techcorp.com', status: 'Accepté' },
    { id: 2, jobTitle: 'Designer UX', company: 'Designify', contact: 'info@designify.com', status: 'En attente' },
    { id: 3, jobTitle: 'Chef de projet', company: 'ProjManage', contact: 'hr@projmanage.com', status: 'Refusé' },
  ];
}
