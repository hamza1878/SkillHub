import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { SingupComponent } from './pages/auth/singup/singup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumesBuidlerComponent } from './BodyContent/resumes-buidler/resumes-buidler.component';
import { CompainesComponent } from './BodyContent/compaines/compaines.component';
import { ApplicationsComponent } from './apply/applications/applications.component';
import { ResumesComponent } from './BodyContent/resumes/resumes.component';
import { SingOutComponent } from './BodyContent/sing-out/sing-out.component';
import { SettingsComponent } from './BodyContent/settings/settings.component';
import { UsersComponent } from './BodyContent/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersSettings } from './BodyContent/users-settings/users-settings.component';
import { CvComponent } from './BodyContent/cv/cv.component';
import { Cv2Component } from './BodyContent/cv2/cv2.component';
import { Cv1Component } from './BodyContent/cv1/cv1.component';
import { Cv3Component } from './BodyContent/cv3/cv3.component';
import { ColorPickerComponent } from './BodyContent/color-picker/color-picker.component';
import { Cv4Component } from './BodyContent/cv4/cv4.component';
import { RoleComponent } from './role/role.component';
import { SignupChoixComponent } from './pages/auth/signup-choix/signup-choix.component';
import { WidgetsComponent } from './BodyContent/widgets/widgets.component';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { CompanySettings } from './BodyContent/company-settings/company-settings.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';  
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CandidateDetailsComponent } from './apply/candidate-details/candidate-details.component';
import { ResponseFormComponent } from './apply/response-form/response-form.component';
import { BodycompComponent } from './apply/bodycomp/bodycomp.component';
import { FindjobComponent } from './findjob/findjob.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    SingupComponent,
    WidgetsComponent,
    UsersSettings,
    CompanySettings,
    CandidateDetailsComponent,ResponseFormComponent,BodycompComponent,FindjobComponent
  ],
  imports: [
    MatButtonModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LandingComponent,
    BodyComponent,
    FooterComponent,
    NavbarComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    GraphQLModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule
    
],
  providers: [
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({ uri: 'http://localhost:3000/api/graphql' }),
        cache: new InMemoryCache(),
      };
    }),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
