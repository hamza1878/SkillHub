import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Candidate {
  name: string;
  position: string;
  date: string;
  status: string;
  etat: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobApplicationService {
  private etatSubject = new BehaviorSubject<Candidate[]>([]); 
  etat = this.etatSubject.asObservable();

  // Set state for a candidate
  setEtat(candidate: Candidate): void {
    const currentState = this.etatSubject.getValue();
    const updatedState = currentState.map(c => 
      c.name === candidate.name ? { ...c, etat: candidate.etat } : c
    );
    this.etatSubject.next(updatedState); 
  }

  private cvDataSubject = new BehaviorSubject<any[]>([]);  
  applyjob = this.cvDataSubject.asObservable();

  // Update candidate's response type and state
  responseType(candidate: Candidate, responseType: string): void {
    const currentState = this.etatSubject.getValue();

    // Find candidate and update 'etat' based on responseType
    const updatedState = currentState.map(c => 
      c.name === candidate.name ? { ...c, etat: responseType } : c
    );
    this.etatSubject.next(updatedState);
  }

  // Apply a new job application
  apply(application: any): void {
    const currentData = this.cvDataSubject.getValue();
    currentData.push(application); 
    this.cvDataSubject.next(currentData); 
  }

  getApplyJob(): any[] {
    return this.cvDataSubject.getValue();
  }
}
