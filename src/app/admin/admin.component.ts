import { Component, OnInit } from '@angular/core';
import {MONTHS} from '../MonthData';
import {Month} from '../Month';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {AuthscopteService} from '../authscopte.service'
import {DOMAIN} from '../MonthData';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selectedmonth: number = 0;
  selectedyear: number = 0;
  months: Month[] = MONTHS;
  years:number[] = [2018, 2019];
  returnmessage = "";
  
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

domainurl = DOMAIN;

  constructor(private http: HttpClient, private authservice: AuthscopteService) { }

  ngOnInit() {
        this.authservice.validatelogin('admin');
  }

  initmonth(selectedmonth: number, selectedyear: number)
  {
  	console.log("Month:" + selectedmonth + " initialized year:" + selectedyear );
    this.getinitializemonth(selectedmonth, selectedyear).subscribe(
      msg => {
        this.returnmessage = msg;
        console.log("Server message: " + msg);
      }
      );
  }

  closemonth(selectedmonth: number, selectedyear: number)
  {
    console.log("Month:" + selectedmonth + " closed year:" + selectedyear);
    this.getclosemonth(selectedmonth, selectedyear).subscribe(
      msg => {
        this.returnmessage = msg;
        console.log("Server message:" + msg);
      }
      )
  }

  generatereport(selectedmonth: number, selectedyear: number)
  {
    console.log("Generate Report Month:" + selectedmonth + " year:" + selectedyear);
    this.gethttpgeneratereport(selectedmonth, selectedyear).subscribe(
      msg => {
        this.returnmessage = msg;
        console.log("Server message:" + msg);
      }
      )
  }

  getinitializemonth(selectedmonth:number, selectedyear):Observable<string>
  {
     var geturl = this.domainurl + "/init_month.php?month=" + (selectedmonth) + "&year=" + selectedyear;
     return  this.http.get<string>(geturl);
  }

  getclosemonth(selectedmonth:number, selectedyear):Observable<string>
  {
     var geturl = this.domainurl + "/close_month.php?month=" + (selectedmonth) + "&year=" + selectedyear;
     return  this.http.get<string>(geturl);
  }  

  gethttpgeneratereport(selectedmonth:number, selectedyear): Observable<string>{
    var geturl = this.domainurl + "/generate_report.php?month=" + selectedmonth + "&year=" + selectedyear;
    return  this.http.get<string>(geturl);
  }    

}
