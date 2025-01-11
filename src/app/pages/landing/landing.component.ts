import { Component } from '@angular/core';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BodyComponent } from '../../components/body/body.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  standalone: true,
  imports: [FooterComponent, BodyComponent, NavbarComponent],

})
export class LandingComponent {
}
