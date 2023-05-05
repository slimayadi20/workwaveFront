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
import { CreateOrderComponent } from './Orders/create-order/create-order.component';
import { CreateSupplierComponent } from './Supplier/create-supplier/create-supplier.component';
import { ListSupplierComponent } from './Supplier/list-supplier/list-supplier/list-supplier.component';
import { UpdateComponent } from './Supplier/update-supplier/update/update.component';
import { ListOrdersComponent } from './Orders/create-order/orders-list/list-orders/list-orders.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { EditOrderComponent } from './Orders/edit-order/edit-order/edit-order.component';


 


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
    ProductListComponent,
    
    
    
    
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgProgressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
