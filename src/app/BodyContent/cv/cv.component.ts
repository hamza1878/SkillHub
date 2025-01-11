import { Component, OnInit } from '@angular/core';
import { CvService } from '../../cv.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
  standalone:false,
})
export class CvComponent implements OnInit {
  cvData: any = {
    personalInfo: { firstName: '', lastName: '', email: '', phone: '', linkedin: '' },
    professionalSummary: '',
    educationPrinciple: [],
    experiences: [],
    projects: [],
    certifications: [],
    imagePreview: null
  };
  color: number = 0;

  constructor(private cvService: CvService) {}

  ngOnInit() {
    this.cvService.cvData$.subscribe(data => {
      if (data) {
        console.log('CV Data received:', data);
        this.cvData = { ...data };

        this.cvData.educationPrinciple = data.educationPrinciple || [];
        this.cvData.experiences = data.experiences || [];
        this.cvData.projects = data.projects || [];
        this.cvData.certifications = data.certifications || [];
      }
    });

    this.cvService.color$.subscribe(color => {
      this.color = color;
      console.log('Received color:', color);
    });
  }
  exportToPDF() {
    const element = document.getElementById('contentToExport');
    if (!element) {
      console.error('Element not found');
      return;
    }
  
    const options = {
      scale: 2, // Enhances rendering quality
      useCORS: true,
      allowTaint: false,
    };
  
    html2canvas(element, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      let position = 0;
      while (position < canvas.height) {
        const sectionHeight = Math.min(canvas.height - position, pdfHeight * (canvas.width / pdfWidth));
        const sectionCanvas = document.createElement('canvas');
        sectionCanvas.width = canvas.width;
        sectionCanvas.height = sectionHeight;
        const ctx = sectionCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(canvas, 0, position, canvas.width, sectionHeight, 0, 0, sectionCanvas.width, sectionCanvas.height);
        }
        const sectionImgData = sectionCanvas.toDataURL('image/png');
        pdf.addImage(sectionImgData, 'PNG', 0, 0, pdfWidth, (sectionHeight * pdfWidth) / canvas.width);
        position += sectionHeight;
        if (position < canvas.height) pdf.addPage();
      }
  
      pdf.save('webpage.pdf');
    }).catch((error) => {
      console.error('PDF generation error:', error);
    });
  }
}  