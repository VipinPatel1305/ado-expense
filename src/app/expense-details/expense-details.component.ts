import { Component, OnInit } from '@angular/core';
import { Details } from '../Details';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {MONTHS} from '../MonthData';
import {Month} from '../Month';
import {YEARS} from '../MonthData';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {AuthscopteService} from '../authscopte.service';
import {DOMAIN} from '../MonthData';
@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})
export class ExpenseDetailsComponent implements OnInit {

  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

  publishmode:boolean = false;
  months = MONTHS;
  years = YEARS;
  total:number = 0;
  cumbal:number = 0;
  montlydeposit:number = 280000;
  balance:number = 0;
  prevbal:number = 0;
  newdetail: Details = new Details("sd", "sd", 2, 4, new Date(), 21, 2018);
  dateval: Date = new Date();
  scope = "";
  selectedyear = 2018;
  selectedmonth: Month = new Month(1, "January");
  disabledownload = true;
  downloadlink = "";

  constructor(private http: HttpClient, private authservice: AuthscopteService) {

   }

  domainurl = DOMAIN;

  ngOnInit() {
    this.authservice.validatelogin('public');
    if(this.authservice.getScope() == "public")
    {
      this.publishmode = true;
      this.scope = "public";
    }
  }

   details: Details[];


  fillinvoice(selectedmonth: Month, selectedyear): void{
      console.log("selected month:" + this.selectedmonth.name + " and year: " + selectedyear)
      this.disabledownload = false;
        this.getinvoice(selectedmonth.id, selectedyear)
    // clone the data object, using its known Config shape
    .subscribe(details => {
      this.details = details;
      this.total = 0;
      var indx = 1;
      for (let detail of this.details) {
        this.total += Number(detail.amount);
        detail.index = indx;
        indx += 1;
      }

      this.balance = this.montlydeposit - this.total;
      this.getcumulativebal(selectedmonth.id, selectedyear).subscribe(
        prevbal =>{
          this.prevbal = prevbal;
          this.cumbal = prevbal + this.balance;
          console.log(this.prevbal+ "previous balane");
        }
        );

      this.downloadlink = this.domainurl + "/download.php?month=" + selectedmonth.id 
       + "&year=" + selectedyear;
       console.log("download link:" + this.downloadlink);
    }
    );
  }  

  getcumulativebal(monthval:number, selectedyear):Observable<number>
  {
     var geturl = this.domainurl +  "/get_cumbal.php?month=" + (monthval - 1) + "&year=" + selectedyear;
     return  this.http.get<number>(geturl);
  }

  getinvoice(monthval, selectedyear): Observable<Details[]>{
  // now returns an Observable of Config
  var geturl = this.domainurl + "/get_invoice.php?month=" + monthval + "&year=" + selectedyear;
  return  this.http.get<Details[]>(geturl);
}

  updatedetail(detail: Details)
  {
    console.log("Update: id" + detail.id + " amount: " + detail.updateamount + detail.description + detail.recipt_num + detail.trans_date);
    console.log(detail);
    detail.id = Number(detail.id);
    // detail.amount = detail.updateamount;
    this.updatedetailhttp(detail).subscribe();
  }

  updatedetailhttp(detail: Details): Observable<string>{
  // now returns an Observable of Config
  var geturl = this.domainurl + "/update_invoice.php";
  return  this.http.post<string>(geturl, detail, this.httpOptions);
  }

  deletedetail(detail: Details)
  {
    console.log("Delete: id" + detail.id + " amount: " + detail.updateamount + detail.description + detail.recipt_num + detail.trans_date);
    console.log(detail);
    detail.id = Number(detail.id);
    this.details = this.details.filter(h => h !== detail);
    this.deletedetailhttp(detail).subscribe();
  }

  deletedetailhttp(detail: Details): Observable<string>{
  // now returns an Observable of Config
  var geturl = this.domainurl + "/delete_invoice.php"
  return  this.http.post<string>(geturl, detail, this.httpOptions);
  }

 // generatereport(selectedmonth: Month, selectedyear)
 // {
 //   console.log("generate report called:" + selectedmonth.id);
 //   this.gethttpreport(selectedmonth.id, selectedyear).subscribe();
 // }

 //  gethttpreport(monthval, selectedyear): Observable<string>{
 //    var geturl = this.domainurl + "/download.php?month=" + monthval + "&year=" + selectedyear;
 //    return  this.http.get<string>(geturl);
 //  }


  publish(){
      if(this.publishmode == true)
      {
        this.publishmode = false;
      }
      else{
        this.publishmode = true;
      }
  }

}
