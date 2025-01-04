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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,

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

    
  ],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }
