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
  selector: 'app-cheque-details',
  templateUrl: './cheque-details.component.html',
  styleUrls: ['./cheque-details.component.css']
})
export class ChequeDetailsComponent implements OnInit {
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

  dateval: Date = new Date();
  years = [2018, 2019];
  selectedyear = 4;
  selectedmonth = 5;
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

   cheques: Cheque[];


  fillcheque(selectedmonth, selectedyear): void{
      console.log("selected month and year" + selectedmonth + " " + selectedyear)
        this.getcheque(selectedmonth, selectedyear)
    // clone the data object, using its known Config shape
    .subscribe(cheques => this.cheques = cheques);
  }  

  getcheque(selectedmonth, selectedyear): Observable<Cheque[]>{
  // now returns an Observable of Config
  var geturl = "http://localhost:8888/records/get_cheque.php?month=" + selectedmonth + "&year=" + selectedyear;
  return this.http.get<Cheque[]>(geturl);
}

  updaterecord(cheque: Cheque){
    console.log("Update record:" + cheque.amount + cheque.purpose + cheque.settled);
  }

}
