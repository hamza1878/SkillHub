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

  private colorSubject = new BehaviorSubject<number>(1); 
  color$ = this.colorSubject.asObservable();

  constructor() {}

  color(newColor:number): number {
    this.colorSubject.next(newColor); 
    return newColor;
  }

  getColor(): number {
    return this.colorSubject.getValue();
  }
  updateCv(newData: any) {
    const currentData = this.cvDataSubject.getValue();
    const updatedData = { ...currentData, ...newData }; 
    this.cvDataSubject.next(updatedData);
  }}


