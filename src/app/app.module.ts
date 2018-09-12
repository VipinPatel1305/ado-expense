import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ChequeFormComponent } from './cheque-form/cheque-form.component';
import { ChequeDetailsComponent } from './cheque-details/cheque-details.component';
import { AdminComponent } from './admin/admin.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module'; 
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    ExpenseDetailsComponent,
    InvoiceFormComponent,
    ChequeFormComponent,
    ChequeDetailsComponent,
    AdminComponent,
    MainComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
