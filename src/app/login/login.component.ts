import { Component, OnInit } from '@angular/core';

import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {User} from '../User';


import {AuthscopteService} from '../authscopte.service'
import {ServerResponse} from '../ServerResponse';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {DOMAIN} from '../MonthData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 server_res:string = "";
 user = new User();
 cookieValue = 'UNKNOWN';
 domainurl = DOMAIN;
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })};

  constructor(private http: HttpClient,
    private authservice: AuthscopteService, private router: Router){
    }

  ngOnInit() {
    this.authservice.authroute('/main', "public");
    }

onSubmit()
{
  this.loginhttp(this.user).subscribe(res=> {
    //console.log("res:" + res.msg + " " + res.status);
    if(res.status == "successful")
    {
      this.authservice.setCookie(res.msg);
      this.authservice.authroute('/main', "public");
    }
    else{
      this.server_res = "Authentication failed";
    }
  }, err => {
    console.error("error logged ", err.error.msg);
    this.server_res = err.error.msg;
  });
}

 loginhttp(user: User): Observable<ServerResponse> {
    //console.log("making post request with: " + user.name + " " + user.pass);
    return this.http.post<ServerResponse>(this.domainurl + "/login.php", user, this.httpOptions);
  }  
}
