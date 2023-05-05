import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgProgressModule } from 'ngx-progressbar';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MainComponent } from './main/main.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { RegistersuccessComponent } from './registersuccess/registersuccess.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularTypewriterEffectModule } from 'angular-typewriter-effect';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    ResetComponent,
    FooterComponent,
    NavbarComponent,
    SidemenuComponent,
    MainComponent,
    DashboardComponentComponent,
    RegistersuccessComponent,
    ResetPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgProgressModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    BrowserAnimationsModule,
    AngularTypewriterEffectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
