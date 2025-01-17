import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../../pages/auth/login/login.component';
@Component({
  selector: 'app-navbar',
  standalone: true, // Ensure this is set to true

  templateUrl: './navbar.component.html',
  imports: [CommonModule], // Ajouter CommonModule pour les directives structurelles

})
export class NavbarComponent implements OnInit {
  menuVisible = false;

  @Input() id: string | undefined;
  loginVisible: boolean=true;

  constructor(private router: Router,private route:ActivatedRoute){
  
  }
  ngOnInit(): void {
    const currentRoute = this.router.url; 
    if (currentRoute.includes('login')) {
      this.loginVisible=false
      console.log('Current route is LoginComponent:', currentRoute);
    }
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  login(): void {
    console.log("Navigating to '/login'");
    this.router.navigate(['/login']);
  }}
