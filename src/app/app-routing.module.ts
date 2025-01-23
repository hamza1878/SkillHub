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
import { ApplicationsComponent } from './apply/applications/applications.component';
import { SignupChoixComponent } from './pages/auth/signup-choix/signup-choix.component';
import { FindjobComponent } from './BodyContent/findjob/findjob.component';
import { ApplyPostsComponent } from './apply/apply-posts/apply-posts.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'signup', component: SingupComponent }, 
  { path: 'choix', component: SignupChoixComponent }, 
  
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent }, 
      { path: 'Findjob', component: FindjobComponent },
      { path: 'ApplyPosts', component: ApplyPostsComponent },

      
      { path: 'users', component: UsersComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'companies', component: CompainesComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'singout', component: SingOutComponent },
      { path: 'resumesbuilder', component: ResumesBuidlerComponent },
      { path: 'resumes', component: ResumesComponent },
    ],
  },
  { path: 'body', component: BodyComponent }, 
  { path: 'footer', component: FooterComponent }, 
  { path: 'navbar', component: NavbarComponent },
  { path: '**', redirectTo: 'dashboard' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule], 
})
export class AppRoutingModule {}
