import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import { Cv2Component } from './BodyContent/cv2/cv2.component';
import { Cv1Component } from './BodyContent/cv1/cv1.component';
import { Cv3Component } from './BodyContent/cv3/cv3.component';
import { ColorPickerComponent } from './BodyContent/color-picker/color-picker.component';
import { Cv4Component } from './BodyContent/cv4/cv4.component';
import { RoleComponent } from './role/role.component';
import { SignupChoixComponent } from './pages/auth/signup-choix/signup-choix.component';

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
    Cv2Component,
    Cv1Component,
    Cv3Component,
    ColorPickerComponent,
    Cv4Component,
    RoleComponent,
    SignupChoixComponent,
    SingupComponent

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
