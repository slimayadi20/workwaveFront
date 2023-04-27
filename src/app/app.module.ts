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
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { JitsiComponentComponent } from './chat/jitsi-component/jitsi-component.component';

 


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
    JitsiComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgProgressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
