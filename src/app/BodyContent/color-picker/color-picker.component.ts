import { Component } from '@angular/core';
import { CvService } from '../../cv.service';

@Component({
  selector: 'app-color-picker',
  standalone: false,
  
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.css'
})
export class ColorPickerComponent {
  showColorOptions = false; 
  
  colors: string[] = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
  ];

  displayedColors: string[] = this.colors.slice(0);

  constructor(private cvService: CvService) {}

  toggleColorOptions() {
    this.showColorOptions = !this.showColorOptions;
  }
nbr=0;
  selectColor(color: string):void {
    console.log('Couleur sélectionnée :', color);
    if(color=='#FF0000'){
      console.log(1)
       this.nbr=1
    }
    if(color=='#00FFFF'){
      console.log(2)

      this.nbr=2
    }
    if(color=='#FF00FF'){
      console.log(3)

      this.nbr=3
    }
    if(color=='#00FFFF'){
      console.log(4)

      this.nbr=4

    }
    this.cvService.color(this.nbr);
    this.showColorOptions = false; 
  }


}