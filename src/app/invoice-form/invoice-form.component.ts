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
import {MatDialog} from '@angular/material';
import {SampleDialogComponent} from '../sample-dialog/sample-dialog.component';
import {ServerResponse} from '../ServerResponse';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {

today:Date  = new Date();
months: Month[] = MONTHS;
years = YEARS;
domainurl = "";
serverResponse: ServerResponse;

  newinvoice = new Details("  ", "ADO 211", 0, 0, this.today, 1, 2018);

  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })};

  constructor(private http: HttpClient, private authservice: AuthscopteService, public dialog: MatDialog) { 
    this.today.setHours(0);
    this.serverResponse = new ServerResponse();
    this.serverResponse.msg = "fake message from server";
    this.serverResponse.status = "200";
     this.domainurl = authservice.getDomainUrl();
  }

  ngOnInit() {
    this.authservice.validatelogin('mcm');
  }

get diagnostic() { return JSON.stringify(this.newinvoice); }


onSubmit()
{
	console.log(this.newinvoice);
	this.addinvoice(this.newinvoice).subscribe(res => {
    this.serverResponse.err = false;
    this.serverResponse.details = this.newinvoice;
    this.serverResponse.msg = res.msg;
    this.openDialog();
  },
    err => {
      this.serverResponse.err = true;
      console.log("error:", err);
      this.serverResponse.msg = "Server Error: " + err.error.msg;
      this.openDialog();
    });
}


addinvoice (newinvoice: Details): Observable<ServerResponse> {
	console.log("making post request");
  return this.http.post<ServerResponse>(this.domainurl + "/post_invoice.php", newinvoice, this.httpOptions);
}

openDialog(): void {
    const dialogRef = this.dialog.open(SampleDialogComponent, {
      data: this.serverResponse,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }  
}
