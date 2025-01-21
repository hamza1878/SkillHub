import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../../cv.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


import $ from 'jquery';

import { CvComponent } from '../cv/cv.component';

@Component({
  selector: 'app-resumes-buidler',
  standalone: false,
  
  templateUrl: './resumes-buidler.component.html',
  styleUrl: './resumes-buidler.component.css'
})
export class ResumesBuidlerComponent {
  resumeForm: FormGroup;
  imagePreview: string | null = null;
  currentStep = 0;
  cvData: any = {};
  cvList: any[] = [];
  currentCvIndex: number = 0;
  steps = [
    { id: 'personalInfo', title: 'Personal Info' },
    { id: 'professionalSummary', title: 'Professional Summary' },
    { id: 'education', title: 'Education' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'certifications', title: 'Certifications' },
    { id: 'skills', title: 'skills' },

  ];
showPreview: any;
isCvVisible: boolean = true;
  color='';
  htmlContent: string='';
switch: any;

toggleCv() {
  this.isCvVisible = !this.isCvVisible;
}
populateResumeForm() {
  this.resumeForm = this.fb.group({
    personalInfo: this.fb.group({
      firstName: [this.cvData.firstName || ''],
      lastName: [this.cvData.lastName || ''],
      email: [this.cvData.email || ''],
      phone: [this.cvData.phone || ''],
      profilePicture: [this.cvData.profilePicture || ''],
      linkedin: [this.cvData.linkedin || ''],
      github: [this.cvData.github || ''],
    }),
    professionalSummary: [this.cvData.professionalSummary || ''],
    educationPrinciple: this.fb.array([]),
    experiences: this.fb.array([]),
    projects: this.fb.array([]),
    certifications: this.fb.array([]),
    skills: this.fb.array([]), 

  });

  this.resumeForm.valueChanges.subscribe((value) => {
    this.cvService.updateCv(value);
  });

  this.addEducationPrinciple();
  this.addExperience();
  this.addSkills(); 
  this.addProject()
  this.addCertification();

  this.cvData.skills.forEach((skill: string) => {
    this.skills.push(this.fb.group({ skill: [skill] })); 
  });
}
  constructor(private fb: FormBuilder, private cvService: CvService){

     this.cvService.cvData$.subscribe(data => {
       this.cvData = data || {};  
       
     });
     this.resumeForm = this.fb.group({
           personalInfo: this.fb.group({
             firstName: [''],
             lastName: [''],
             email: [''],
             phone: [''],
             profilePicture:[''],
             linkedin:[''],
             github:[''],
             jobtitle:['']
           }),
           professionalSummary: [''],
           educationPrinciple: this.fb.array([]),
           experiences: this.fb.array([]), 
           projects: this.fb.array([]),
           certifications: this.fb.array([]),
           skills: this.fb.array([])
          });

this.cvData.skills.forEach((skill: string) => {
  this.skills.push(this.fb.group({ skills: [skill] }));
});

           this.resumeForm.get('personalInfo.profilePicture')?.valueChanges.subscribe((value) => {
       if (value) {
         this.onFileSelected(value);
         this.cvService.updateCv(this.resumeForm.value);
       }
     });
  
         this.addEducationPrinciple();
         this.addExperience();
         this.addCertification();
         this.addSkills();
this.cvData.skills.forEach((skill: string) => {
  this.skills.push(this.fb.group({ skills: [skill] }));
});

         this.resumeForm.valueChanges.subscribe((value) => {
           this.cvService.updateCv(value);
          
         });
    
       }
       
         onFileSelected(event: Event): void {
     const input = event.target as HTMLInputElement;
     if (input && input.files) {
       const file = input.files[0];
       if (file) {
         const reader = new FileReader();

         reader.onload = () => {
           this.imagePreview = reader.result as string;
           this.cvService.updateCv({ ...this.resumeForm.value, profilePicture: this.imagePreview });
         };

         reader.readAsDataURL(file);
       }
     }
   }
   get skills(): FormArray {
    return this.resumeForm.get('skills') as FormArray;
  }

  createSkill(): FormGroup {
    return this.fb.group({
      skills: ['', Validators.required],
    });
  }

  addSkills() {
    this.skills.push(this.createSkill());
  }
   
    get educationPrinciple(): FormArray {
      return this.resumeForm.get('educationPrinciple') as FormArray;
    }
  
    createEducation(): FormGroup {
      return this.fb.group({
        institution: ['', Validators.required],
        degree: ['', Validators.required],
        specialization: ['', Validators.required],
        startEdu: ['', Validators.required],
        endEdu: ['', Validators.required],
        location:['', Validators.required],
         
      });
    }
    addEducationPrinciple(): void {
      this.educationPrinciple.push(this.createEducation());
    }
  
    removeEducation(index: number): void {
      this.educationPrinciple.removeAt(index);
  }

  
  get certifications(): FormArray {
    return this.resumeForm.get('certifications') as FormArray;
  }

  createCertification(): FormGroup {
    return this.fb.group({
      certificationName: [''],
      issuingOrganization: [''],
      year: [''],
      url: [''],
    });
  }

  addCertification(): void {
    this.certifications.push(this.createCertification());
  }

  removeCertification(index: number): void {
    this.certifications.removeAt(index);
  }

  get projects(): FormArray {
    return this.resumeForm.get('projects') as FormArray;
  }

  createProject(): FormGroup {
    return this.fb.group({
      projectTitle: ['', Validators.required],
      description: ['', Validators.required],
      role: ['', Validators.required],
      linkcertficat: ['', Validators.required],
      technologies: ['', Validators.required],

      
      
      
      
      
    });
  }

  addProject(): void {
    this.projects.push(this.createProject());
  }

  removeProject(index: number): void {
    this.projects.removeAt(index);
  }

  onSubmit(): void {
    if (this.resumeForm.valid) {
      console.log(this.resumeForm.value);
    } else {
      console.log('Form is not valid!');
    }
  }
  get experiences(): FormArray {
    return this.resumeForm.get('experiences') as FormArray;
  }

   createExperience(): FormGroup {
     return this.fb.group({
       company: ['', Validators.required],
       jobTitle: ['', Validators.required],
       startDate: ['', Validators.required],
       endDate: ['', Validators.required],
       description: ['', Validators.required],
      
     });
   }

   addExperience(): void {
     this.experiences.push(this.createExperience());
   }

   removeExperience(index: number): void {
     this.experiences.removeAt(index);
   }

  //  this.cvService.loadCvData();
    
  //  this.cvService.cvData$.subscribe((data) => {
  //    this.cvData = data;
  //    this.populateResumeForm();  
  //  });

  ngOnInit(): void {
    //  this.addExperience();
    // this.addEducationPrinciple();
   
  }
  nextStep() {
    const currentStepId = this.steps[this.currentStep].id;
    const currentFormGroup = this.resumeForm.get(currentStepId);

    if (currentFormGroup && currentFormGroup.valid) {
      this.currentStep++;
    } else {
      this.currentStep++;

      currentFormGroup?.markAllAsTouched();
    }
  }

  previousStep() {
    this.currentStep--;
  }
  exportCvToPDF(): void {
    const cvElement = document.getElementById('cvContent');
    if (!cvElement) {
      console.error('Element not found!');
      return;
    }
  
    const originalOverflow = cvElement.style.overflow;
    cvElement.style.overflow = 'visible';
  
    html2canvas(cvElement, { scale: 8, useCORS: true, logging: true })
      .then((canvas) => {
        cvElement.style.overflow = originalOverflow;
  
        const imgData = canvas.toDataURL('image/png');
  
        const pdf = new jsPDF('p', 'mm', 'a4');
  
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
  
        const imgWidth = canvas.width-2;
        const imgHeight = canvas.height-2;
  
        const scale = Math.min(pdfWidth / imgWidth, pdfHeight-2 / imgHeight);
        const newWidth = imgWidth * scale;
        const newHeight = imgHeight * scale;
  
        const x = (pdfWidth - newWidth) /4;
        const y = (pdfHeight - newHeight) /10;
  
        pdf.addImage(imgData, 'PNG', x, y, newWidth, newHeight);
  
        pdf.save('CV.pdf');
      })
      .catch((error) => {
        console.error('Error exporting to PDF:', error);
      });
  }
  exportCvToHTML(): void {
    const cvElement = document.getElementById('cvContent');
    console.log(cvElement)
    this.cvService.cvsave(cvElement)
    if (!cvElement) {
      console.error('Element not found!');
      return;
    }
  
    const htmlContent = cvElement.outerHTML;
  
    const blob = new Blob([htmlContent], { type: 'text/html' });
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'CV.html'; 
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  exportCvAsPdf() {
    const cvContent = document.getElementById('cvContent');
    
    if (cvContent) {
      const htmlContent = cvContent.outerHTML;
  
      const styles = Array.from(document.styleSheets)
        .map((sheet: CSSStyleSheet) => {
          if (sheet.href) {
            return `<link rel="stylesheet" href="${sheet.href}">`;
          }
          return `<style>${this.getCssFromSheet(sheet)}</style>`;
        })
        .join('\n');
  
      const completeHtmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            <title>CV Export</title>
            ${styles}
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `;
      console.log({styles})
      console.log({htmlContent})

      const $param1 = $(document);  
      const $param2 = $('#cvContainer');  
        console.log($(document))
      const blob = new Blob([completeHtmlContent], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'cv.html';
      this.cvService.cvHtml($param1, { styles: styles }, $param2, { htmlContent: htmlContent });
      link.click();
        localStorage.getItem(this.cvData)
    }
    this.saveCvDataToLocalStorage();

  }
  
  
  saveCvDataToLocalStorage(): void {
    const cvDataToSave = JSON.stringify(this.cvData);
    localStorage.setItem('cvData', cvDataToSave); 
    console.log('CV Data saved to localStorage');
  }
  getCssFromSheet(sheet: CSSStyleSheet): string {
    let cssText = '';
    try {
      if (sheet.cssRules) {
        cssText = Array.from(sheet.cssRules).map((rule: CSSRule) => rule.cssText).join('\n');
      }
    } catch (e) {
      console.error('Error accessing CSS rules:', e);
    }
    return cssText;
  }
}  

  // exportAsImage(): void {
  //   const element = document.querySelector('.cv-container') as HTMLElement;
  //   html2canvas(element).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const link = document.createElement('a');
  //     link.download = 'cv.png';
  //     link.href = imgData;
  //     link.click();
  //   });
  // }

  // exportAsPDF(): void {
  //   const element = document.querySelector('.cv-container') as HTMLElement;
  //   html2canvas(element).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     const imgWidth = 210;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  //     pdf.save('cv.html');
  //   });
  // }
  // exportHtmlToFile(): void {
  //   const blob = new Blob([this.htmlContent], { type: 'text/html' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'widget.html';
  //   a.click();
  //   window.URL.revokeObjectURL(url);}

  // addNewCv(): void {
  //   this.cvList.push({});
  //   this.currentCvIndex = this.cvList.length - 1;
  //   this.cvData = this.cvList[this.currentCvIndex];
  //   this.resumeForm.patchValue(this.cvData);
  // }
  

  // selectCv(index: number): void {
  //   this.currentCvIndex = index;
  //   this.cvData = this.cvList[index];
  //   this.resumeForm.patchValue(this.cvData);
  // }

  
  // cvColor(){
  //   if(this.color<3){
  //   this.color++;
   

  //   console.log(this.color)
  // }else{
  //     this.color=1;
  //   console.log(this.color)
  //   }
  //   this.cvService.color(this.color);}
  
  