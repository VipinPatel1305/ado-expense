import { Component, OnInit } from '@angular/core';
import { Details } from '../Details';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {MONTHS} from '../MonthData';
import {Month} from '../Month';
import {YEARS} from '../MonthData';
import {AuthscopteService} from '../authscopte.service';
import {DOMAIN} from '../MonthData';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {

today:Date  = new Date();
months: Month[] = MONTHS;
years = YEARS;
domainurl = DOMAIN;
  newinvoice = new Details("  ", "ADO 211", 0, 0, this.today, 1, 2018);

  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })};

  constructor(private http: HttpClient, private authservice: AuthscopteService) { 
    this.today.setHours(0);
  }

  ngOnInit() {
    this.authservice.validatelogin('mcm');
  }

get diagnostic() { return JSON.stringify(this.newinvoice); }


onSubmit()
{
	console.log(this.newinvoice);
	this.addinvoice(this.newinvoice).subscribe();
}


addinvoice (newinvoice: Details): Observable<Details> {
	console.log("making post request");
  return this.http.post<Details>(this.domainurl + "/post_invoice.php", newinvoice, this.httpOptions);
  }

}
