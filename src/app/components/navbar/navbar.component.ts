import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true, // Ensure this is set to true

  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  menuVisible = false;
  constructor(private Router:Router){}
  ngOnInit(): void {
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  @Input() id: string | undefined; 
  login(){
    console.log("this.login")
    this.Router.navigate(['/login'])

  }
}
