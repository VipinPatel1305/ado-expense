import { Component } from '@angular/core';
import {AuthscopteService} from './authscopte.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  scope: string = "un";
  title = 'app';
  loggedin = "false"

  constructor(private authservice: AuthscopteService) {
   }
  ngOnInit() {
   this.authservice.validatepubliclogin();
  }

}
