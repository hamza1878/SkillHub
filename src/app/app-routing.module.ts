import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SingupComponent } from './pages/auth/singup/singup.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './BodyContent/users/users.component';
import { CompainesComponent } from './BodyContent/compaines/compaines.component';
import { SettingsComponent } from './BodyContent/settings/settings.component';
import { SingOutComponent } from './BodyContent/sing-out/sing-out.component';
import { ResumesBuidlerComponent } from './BodyContent/resumes-buidler/resumes-buidler.component';
import { ResumesComponent } from './BodyContent/resumes/resumes.component';
import { ApplicationsComponent } from './BodyContent/applications/applications.component';
import { SignupChoixComponent } from './pages/auth/signup-choix/signup-choix.component';
const routes: Routes = [
  { path: '', redirectTo: 'companies', pathMatch: 'full' }, // Redirect default route to landing
  { path: 'landing', component: LandingComponent }, // Landing page
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'signup', component: SingupComponent }, // Signup page
  { path: 'choix', component: SignupChoixComponent }, // Signup page
  
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent }, // Signup page

      { path: 'users', component: UsersComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'companies', component: CompainesComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'singout', component: SingOutComponent },
      { path: 'resumesbuilder', component: ResumesBuidlerComponent },
      { path: 'resumes', component: ResumesComponent },
    ],
  },
  { path: 'body', component: BodyComponent }, // Body component
  { path: 'footer', component: FooterComponent }, // Footer component
  { path: 'navbar', component: NavbarComponent }, // Navbar component
  { path: '**', redirectTo: 'dashboard' }, // Catch-all route choix
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import the routing configuration
  exports: [RouterModule], // Export the RouterModule so it can be used in other parts of the application
})
export class AppRoutingModule {}
