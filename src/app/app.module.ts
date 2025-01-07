import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import standalone components here
import { SingupComponent } from './pages/auth/singup/singup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumesBuidlerComponent } from './BodyContent/resumes-buidler/resumes-buidler.component'
import { CompainesComponent } from './BodyContent/compaines/compaines.component';
import { ApplicationsComponent } from './BodyContent/applications/applications.component';
import { ResumesComponent } from './BodyContent/resumes/resumes.component'
import { SingOutComponent } from './BodyContent/sing-out/sing-out.component'
import { SettingsComponent } from './BodyContent/settings/settings.component'
import { UsersComponent } from './BodyContent/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CvComponent } from './BodyContent/cv/cv.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ResumesBuidlerComponent,
    CompainesComponent,
    ApplicationsComponent,
    ResumesComponent,
    SingOutComponent,
    SettingsComponent,
    UsersComponent,
    CvComponent,

    // Do not declare the standalone components here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LandingComponent,
    BodyComponent,
    FooterComponent,
    NavbarComponent,
    ReactiveFormsModule,FormsModule,RouterModule

    
  ],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }
