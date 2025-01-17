import { Component } from '@angular/core';
import { CvService } from '../../cv.service';

@Component({
  selector: 'app-color-picker',
  standalone: false,
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
})
export class ColorPickerComponent {
  showColorOptions = false;

  colors: string[] = ['blue-500', 'red-500', 'green-500', 'yellow-500', 'purple-500'];
  displayedColors: string[] = [...this.colors];
  constructor(private cvService: CvService) {}

  toggleColorOptions() {
    this.showColorOptions = !this.showColorOptions;
  }

  selectColor(color: string) {
    console.log('Couleur sélectionnée :', color);
    this.cvService.color(color);
    this.showColorOptions = false;
  }
}
