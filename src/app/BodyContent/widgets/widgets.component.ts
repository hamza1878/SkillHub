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
  cvData: any;
  color: number = 0;
 
  isEditing: boolean = false;
  currentWidget: any = {}; 
  id: number;

  constructor(private cvService: CvService, private router: Router) {
    this.id = Number(window.location.href.split("/").pop());
  }

  ngOnInit() {
    this.cvService.cvData$.subscribe((data) => {
      this.cvData = data;
    });

    this.cvService.color$.subscribe((color) => {
      this.color = color;
    });

    this.cvService.cvHtml$.subscribe(({ styles, htmlContent }) => {
      const completeHtmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            ${styles}
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `;
      this.widgets[this.currentWidgetIndex].content = completeHtmlContent;
      this.currentWidgetIndex = (this.currentWidgetIndex + 1) % this.widgets.length;
    });

    const storedCvData = localStorage.getItem('cvData');
    if (storedCvData) {
      const parsedCvData = JSON.parse(storedCvData);
      this.widgets.forEach((widget) => {
        widget.cvData = parsedCvData;
        console.log(widget.cvData)
      });
    } else {
      console.log('No CV data found in localStorage');
    }
  }

  removeWidget(id: number) {
    this.widgets = this.widgets.filter(widget => widget.id !== id);
  }

  startEditing(widget: any) {
    this.currentWidget = { ...widget }; 
    this.isEditing = true;
  }

  submitForm() {
    const updatedWidget = this.widgets.find(widget => widget.id === this.currentWidget.id);
    if (updatedWidget) {
      updatedWidget.title = this.currentWidget.title;
      updatedWidget.content = this.currentWidget.content;
    }

    this.cvService.updateCv({ widgets: this.widgets });

    this.isEditing = false;
    this.router.navigate(['/dashboard/resumesbuilder']);
  }
  widgets: any[] = [];
  currentWidgetIndex: number = 0;
  updateCvFromWidget() {
    const currentWidget = this.widgets[this.currentWidgetIndex];
    const cvData = currentWidget.cvData;
    
    this.cvService.updateCv(cvData);
  }
}





 