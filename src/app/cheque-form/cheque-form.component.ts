import { Component, OnInit } from '@angular/core';
import { Cheque } from '../cheque';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-cheque-form',
  templateUrl: './cheque-form.component.html',
  styleUrls: ['./cheque-form.component.css']
})
export class ChequeFormComponent implements OnInit {
today:Date  = new Date();


  newcheque = new Cheque("momthly", 211, 345, this.today);

    httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })};

  constructor(private http: HttpClient) { 
  this.today.setHours(0);}

  ngOnInit() {
  }
get diagnostic() { return JSON.stringify(this.newcheque); }


onSubmit()
{
	console.log(this.newcheque);
	this.addinvoice(this.newcheque).subscribe();
}


addinvoice (newcheque: Cheque): Observable<Cheque> {
	console.log("making post request");
    return this.http.post<Cheque>("http://localhost:8888/records/post_cheque.php", newcheque, this.httpOptions);
  }

}
