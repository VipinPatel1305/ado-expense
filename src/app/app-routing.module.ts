import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { ChequeFormComponent } from './cheque-form/cheque-form.component';
import { ChequeDetailsComponent } from './cheque-details/cheque-details.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component'; 
import {MainComponent} from './main/main.component';


const routes: Routes = [
  {path: 'new-cheque', component: ChequeFormComponent},
  {path: 'new-invoice', component: InvoiceFormComponent},
  {path: 'report-cheque', component: ChequeDetailsComponent},
  {path: 'report-invoice', component: ExpenseDetailsComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
	  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
