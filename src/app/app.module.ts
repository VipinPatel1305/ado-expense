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
import { SampleDialogComponent } from './sample-dialog/sample-dialog.component';
import {MatDialogModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseDetailsComponent,
    InvoiceFormComponent,
    ChequeFormComponent,
    ChequeDetailsComponent,
    AdminComponent,
    MainComponent,
    LoginComponent,
    SampleDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule, 
    MatDialogModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents: [ SampleDialogComponent ]
})
export class AppModule { }
