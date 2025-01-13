import { Component, EventEmitter, Output } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { CvService } from '../../cv.service';

@Component({
  selector: 'app-cv',
  standalone: false,
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent {
  cvData: any = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      linkedin: '',
    },
    professionalSummary: '',
    educationPrinciple: [],
    experiences: [],
    projects: [],
    certifications: [],
    imagePreview: null,
  };

  color: number = 0;

  constructor(private cvService: CvService) {}

  ngOnInit() {
    // S'abonner aux données du CV
    this.cvService.cvData$.subscribe((data) => {
      if (data) {
        console.log('CV Data received:', data);
        this.cvData = { ...data };

        this.cvData.educationPrinciple = data.educationPrinciple || [];
        this.cvData.experiences = data.experiences || [];
        this.cvData.projects = data.projects || [];
        this.cvData.certifications = data.certifications || [];
      }
    });

    // S'abonner à la couleur sélectionnée
    this.cvService.color$.subscribe((color) => {
      this.color = color;
      console.log('Received color:', color);
    });
  }

  // Méthode pour envoyer les données du CV au widget
  sendCvToWidget() {
    this.cvService.updateCv(this.cvData);
  }
}
//   @Output() pdfGenerated = new EventEmitter<Blob>(); // EventEmitter to send the PDF to WidgetsComponent


//   exportCvToPDF() {
//     const element = document.getElementById('cvContent'); // Récupérer le contenu du CV
//     if (element) {
//       html2canvas(element).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png'); // Convertir le canvas en image
//         const pdf = new jsPDF();
//         pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // Ajouter l'image au PDF (A4)

//         // Générer le PDF en Blob
//         const pdfBlob = pdf.output('blob');

//         // Émettre le Blob à travers l'événement
//         this.pdfGenerated.emit(pdfBlob);
//       });
//     }
//   }
// }