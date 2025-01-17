import { Component, Input } from '@angular/core';

interface Candidate {
  name: string;
  position: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  standalone:false,
})
export class CandidateDetailsComponent {
  @Input() candidate: Candidate | null = null;
}