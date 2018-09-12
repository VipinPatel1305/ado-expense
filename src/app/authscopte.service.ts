import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthscopteService {
  scope:string = "###";
  cookieId = "vip-angular-cookie";
  helper:JwtHelperService;

  constructor(private cookieService: CookieService, private router: Router)
  {
    this.helper = new JwtHelperService();
  }

  authroute(routeTo, access_level)
  {
    this.updatescope();
    var res:boolean = false;
     switch (access_level) {
       case "public":
         //console.log("about to navigate:" + routeTo + " access_level: " + access_level);
         res = this.validatepubliclogin();
         break;
       
       case "mcm":
         res = this.validatemcmlogin();
       break;

       case "admin":
         res = this.validateadminlogin();
       break;

       default:
          this.router.navigate(['/login']);
         break;
     }

     if(res)   
     { 
       //console.log("about to navigate");
        this.router.navigate([routeTo]);
      }
  }

  validatelogin(access_level)
  {
    this.updatescope();
    //console.log("validatelogin, scope: " + this.scope);
    var res:boolean = false;
     switch (access_level) {
       case "public":
         res = this.validatepubliclogin();
         break;
       
       case "mcm":
         res = this.validatemcmlogin();
       break;

       case "admin":
         res = this.validateadminlogin();
       break;

       default:
          this.router.navigate(['/login']);
         break;
     }

     if(res == false)   
     { 
       //console.log("about to navigate");
        this.router.navigate(['/login']);
      }
  }

  validatepubliclogin()
  {
    //console.log("public scope:" + this.scope);
    if(this.scope == "public" || this.scope == "mcm"|| this.scope == "admin")
      return true;
    else 
      return false;
  }

  validatemcmlogin():boolean
  {
    if(this.scope == "mcm" || this.scope == "admin")
      return true;
    else
      return false;
  }  

  validateadminlogin():boolean
  {
    if( this.scope == "admin")
      return true;
    else
      return false;
  }  

  updatescope()
  {
      if(this.scope == "###" && this.cookieService.check(this.cookieId))
      {
         var cookievalue = this.cookieService.get(this.cookieId);
         var decodedToken = this.helper.decodeToken(cookievalue);
         //console.log("decoded token:" + decodedToken);
         //console.log("extracted scope:" + decodedToken.scope);
         this.scope = decodedToken.scope;
     }
  }

  setCookie(cookievalue)
  {
    //this.cookieService.set(this.cookieId, cookievalue);
    this.updatescope();
  }

  getCookie():string{
    return this.cookieService.get(this.cookieId);
  }

  getScope():string
  {
    this.updatescope();
    return this.scope;
  }

  logout()
  {
    this.scope = "###";
    this.cookieService.delete(this.cookieId);
    this.router.navigate(['/login']);
  }
}
