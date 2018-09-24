import { Component, OnInit } from '@angular/core';
import {AuthscopteService} from '../authscopte.service'
import {Router} from '@angular/router';
import {DOMAIN} from '../MonthData';
import {ServerResponse} from '../ServerResponse';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  scope: string = "";
  domainurl = "";

  constructor(private http: HttpClient, private authservice: AuthscopteService, private router: Router) {
    console.log("constrcutor main ");
     this.domainurl = authservice.getDomainUrl();
   }

  ngOnInit() {
    console.log("nginit main ");
    this.authservice.validatelogin('public');
    this.scope = this.authservice.getScope();
  }

  logoff()
  {
  	console.log("logging off");
  	
    this.logouthttp().subscribe(res=> {
      console.log("scope:" + this.authservice.getScope());
      this.authservice.logout();
    }, err =>{
        console.log("failed to logout", err);
    });
  }

  logouthttp(): Observable<ServerResponse>{
  // now returns an Observable of Config
  var geturl = this.domainurl + "/logout.php?scope=" + this.authservice.getScope();
  return  this.http.get<ServerResponse>(geturl);
}
}
