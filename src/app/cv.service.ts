// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class CvService {

//   private cvDataSubject = new BehaviorSubject<any>({
//     personalInfo: { firstName: '', lastName: '', email: '', phone: '', profilePicture: null },
//     professionalSummary: '',
//     educationPrinciple: [],
//     experiences: [],
//     projects: [],
//     certifications: [],
//   });

//   cvData$ = this.cvDataSubject.asObservable();

//   private colorSubject = new BehaviorSubject<number>(1);
//   color$ = this.colorSubject.asObservable();

//   private roleData = new BehaviorSubject<any>(null);
//   role$ = this.roleData.asObservable();

//   private cvHtmlSubject = new BehaviorSubject<{ styles: string, htmlContent: string }>({ styles: '', htmlContent: '' });
//   cvHtml$ = this.cvHtmlSubject.asObservable();  // Create an observable for cvHtml

//   constructor() {}

//   role(role: any) {
//     this.roleData.next(role);
//     console.log(role);
//   }

//   color(newColor: number): number {
//     this.colorSubject.next(newColor);
//     return newColor;
//   }

//   updateCv(newData: any) {
//     const currentData = this.cvDataSubject.getValue();
//     const updatedData = { ...currentData, ...newData };
//     this.cvDataSubject.next(updatedData);
//     localStorage.setItem('cvData', JSON.stringify(updatedData));
//   }

//   loadCvData() {
//     const savedData = localStorage.getItem('cvData');
//     if (savedData) {
//       this.cvDataSubject.next(JSON.parse(savedData));
//     }
//   }

//   cvHtml($param1: any, p0: { styles: string }, $param2: any, p1: { htmlContent: string }) {
//     const styleSheet = p0.styles;
//     const content = p1.htmlContent;
//     const finalHtml = `
//       <style>${styleSheet}</style>
//       <div class="cv-content">
//         ${content}
//       </div>
//     `;

//     $param2('#cvContainer').html(finalHtml);

//     // Emit the styles and htmlContent through the cvHtml$ observable
//     this.cvHtmlSubject.next({ styles: styleSheet, htmlContent: content });
//   }

//   getColor(): number {
//     return this.colorSubject.getValue();
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface CvHtmlContent {
  styles: string;
  htmlContent: string;
}

@Injectable({
  providedIn: 'root',
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


  private roleData = new BehaviorSubject<any>(null);
  role$ = this.roleData.asObservable();

  role(role: any) {
    this.roleData.next(role);
    console.log(role);
  }

  private cvHtmlSubject = new BehaviorSubject<CvHtmlContent>({
    styles: '',
    htmlContent: ''
  });

  cvHtml$ = this.cvHtmlSubject.asObservable();

  constructor() {}

  cvHtml($param1: any, p0: { styles: string }, $param2: any, p1: { htmlContent: string }) {
    if ($param2 && typeof $param2 === 'function') {
      const styleSheet = p0.styles;
      const content = p1.htmlContent;
  
      const finalHtml = `
        <style>${styleSheet}</style>
        <div class="cv-content">
          ${content}
        </div>
      `;
  
      $param2('#cvContainer').html(finalHtml); 
    } else {
      console.error('$param2 is not a valid function', $param2);
    }
  
    this.cvHtmlSubject.next({ styles: p0.styles, htmlContent: p1.htmlContent });
  }
    
  private colorSubject = new BehaviorSubject<number>(1);
     color$ = this.colorSubject.asObservable();
     color(newColor: number): number {
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
    localStorage.setItem('cvData', JSON.stringify(updatedData));  
  }

  loadCvData() {
    const savedData = localStorage.getItem('cvData');
    if (savedData) {
      this.cvDataSubject.next(JSON.parse(savedData));
    }
  }}