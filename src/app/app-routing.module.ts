import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SingupComponent } from './pages/auth/singup/singup.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Define the routes for your application
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent }, // Home page

  { path: 'landing', component: LandingComponent }, // Home page
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'signup', component: SingupComponent }, // Signup page
  { path: 'body', component: BodyComponent }, // Body component
  { path: 'footer', component: FooterComponent }, // Footer component
  { path: 'navbar', component: NavbarComponent }, // Navbar component
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard route for invalid paths
  { path: '**', redirectTo: 'landing' }  // Catch-all route to redirect unknown paths

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import the routing configuration
  exports: [RouterModule] // Export the RouterModule so it can be used in other parts of the application
})
export class AppRoutingModule { }
