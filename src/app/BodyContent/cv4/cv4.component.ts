import { Component, EventEmitter, Output } from '@angular/core';
import { CvService } from '../../cv.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import $ from 'jquery';


@Component({
  selector: 'app-cv4',
  standalone: false,
  
  templateUrl: './cv4.component.html',
  styleUrl: './cv4.component.css'
})
export class Cv4Component {

 cvData: any = {
  personalInfo: { firstName: '', lastName: '', email: '', phone: '',linkedin:'',github:''
  },    professionalSummary: '',
    educationPrinciple: [],
    experiences: [],
    projects: [],
    certifications: [],
    imagePreview: null
  };

  constructor(private cvService: CvService) {}

  ngOnInit() {
    this.cvService.cvData$.subscribe(data => {
      if (data) {
        console.log('CV Data received:', data);
        this.cvData = {...data};
        
        this.cvData.educationPrinciple = data.educationPrinciple || [];
        this.cvData.experiences = data.experiences || [];
        this.cvData.projects = data.projects || [];
        this.cvData.certifications = data.certifications || [];
      }
    });
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
  exportCvWithTailwind() {
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
      const $param1 = $(document);  
      const $param2 = $('#cvContainer');  
        
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