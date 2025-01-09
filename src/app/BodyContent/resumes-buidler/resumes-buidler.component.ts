import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvService } from '../../cv.service';
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
  steps = [
    { id: 'personalInfo', title: 'Personal Info' },
    { id: 'professionalSummary', title: 'Professional Summary' },
    { id: 'education', title: 'Education' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'certifications', title: 'Certifications' },
  ];
showPreview: any;
isCvVisible: boolean = true;
  color=1;

toggleCv() {
  this.isCvVisible = !this.isCvVisible;
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
           }),
           professionalSummary: [''],
           educationPrinciple: this.fb.array([]),
           experiences: this.fb.array([]), 
           projects: this.fb.array([]),
           certifications: this.fb.array([]),
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
  
  // cvColor(){
  //   if(this.color<3){
  //   this.color++;
   

  //   console.log(this.color)
  // }else{
  //     this.color=1;
  //   console.log(this.color)
  //   }
  //   this.cvService.color(this.color);}
  
  }