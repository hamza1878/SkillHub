import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  private cvDataSubject = new BehaviorSubject<any>({
    personalInfo: { firstName: '', lastName: '', email: '', phone: '', profilePicture: null },
    professionalSummary: '',
    educationPrinciple: [],
    experiences: [],
    projects: [],
    certifications: [],
  });

  cvData$ = this.cvDataSubject.asObservable();

  updateCv(newData: any) {
    const currentData = this.cvDataSubject.getValue();
    const updatedData = { ...currentData, ...newData }; // Merge new data with existing data
    this.cvDataSubject.next(updatedData);
  }}


