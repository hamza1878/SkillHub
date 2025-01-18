import { Component, OnInit } from '@angular/core';
import { CvService } from '../../cv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-widgets',
  standalone: false,
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css'],
})
export class WidgetsComponent implements OnInit {
  cvwidget: any;
  i=0
  empty=true
  cvData: any = {
    personalInfo: { firstName: '', lastName: '', email: '', phone: '',linkedin:'',
    },    professionalSummary: '',
      educationPrinciple: [],
      experiences: [],
      projects: [],
      certifications: [],
      imagePreview: null,
      skills: [],
  
    };
  constructor(private cvService: CvService, private router: Router) {
    this.cvService.cvsave$.subscribe((cvElement) => {
      this.i=this.i+1
      this.cvwidget = cvElement.innerHTML;
      console.log("widget", this.cvwidget);
      console.log("i=", this.i);
      

    });
  }
  removeWidget() {
    this.empty=false
    this.i=0
    this.cvwidget = ''; 
  }
  edit() {
    this.cvData= this.cvService.cvData$.subscribe(data => {
      if (data) {
        console.log('CV Data received:', data);
        this.cvData = { ...data };
        this.cvData.skills = data.skills || [];
      }
    });
  }

  ngOnInit(): void {}
}

  // cvData: any;
  // color: string = '';
 
  // isEditing: boolean = false;
  // currentWidget: any = {}; 
  // id: number;

  // constructor(private cvService: CvService, private router: Router) {
  //   this.id = Number(window.location.href.split("/").pop());
  // }

  // ngOnInit() {
  //   this.cvService.cvData$.subscribe((data) => {
  //     this.cvData = data;
  //   });

  //   this.cvService.color$.subscribe((color) => {
  //     this.color = color;
  //   });

  //   this.cvService.cvHtml$.subscribe(({ styles, htmlContent }) => {
  //     const completeHtmlContent = `
  //       <html>
  //         <head>
  //           <meta charset="UTF-8">
  //           ${styles}
  //         </head>
  //         <body>
  //           ${htmlContent}
  //         </body>
  //       </html>
  //     `;
  //     console.log('completeHtmlContent',completeHtmlContent)
  //     this.widgets[this.currentWidgetIndex].content = completeHtmlContent;
  //     this.currentWidgetIndex = (this.currentWidgetIndex + 1) % this.widgets.length;
  //   });

  //   const storedCvData = localStorage.getItem('cvData');
  //   if (storedCvData) {
  //     const parsedCvData = JSON.parse(storedCvData);
  //     this.widgets.forEach((widget) => {
  //       widget.cvData = parsedCvData;
  //       console.log(widget.cvData)
  //     });
  //   } else {
  //     console.log('No CV data found in localStorage');
  //   }
  // }

  // removeWidget(id: number) {
  //   this.widgets = this.widgets.filter(widget => widget.id !== id);
  // }

  // startEditing(widget: any) {
  //   this.currentWidget = { ...widget }; 
  //   this.isEditing = true;
  // }

  // submitForm() {
  //   const updatedWidget = this.widgets.find(widget => widget.id === this.currentWidget.id);
  //   if (updatedWidget) {
  //     updatedWidget.title = this.currentWidget.title;
  //     updatedWidget.content = this.currentWidget.content;
  //   }

  //   this.cvService.updateCv({ widgets: this.widgets });

  //   this.isEditing = false;
  //   this.router.navigate(['/dashboard/resumesbuilder']);
  // }
  // widgets: any[] = [];
  // currentWidgetIndex: number = 0;
  // updateCvFromWidget() {
  //   const currentWidget = this.widgets[this.currentWidgetIndex];
  //   const cvData = currentWidget.cvData;
    
  //   this.cvService.updateCv(cvData);
  // }






 