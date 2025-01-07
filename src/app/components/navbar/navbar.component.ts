import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true, // Ensure this is set to true

  templateUrl: './navbar.component.html',
  imports: [CommonModule], // Ajouter CommonModule pour les directives structurelles

})
export class NavbarComponent implements OnInit {
  menuVisible = false;

  @Input() id: string | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  login(): void {
    alert('Redirecting to login page');
    console.log("Navigating to '/login'");
    this.router.navigate(['/login']);
  }}
