import { Component, OnInit, Injectable } from '@angular/core';

import { Http, Response, HTTP_PROVIDERS } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

import { DiabloApiService } from './diablo/services/diablo-api.service';
import { LocaleService } from './diablo/services/locale.service';
import { ProfileComponent } from './components/profile/profile.component';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
  providers: [
    HTTP_PROVIDERS,
    DiabloApiService
  ],
  directives: [ProfileComponent]
})
export class AppComponent implements OnInit {
  constructor(private diabloApiService: DiabloApiService) {}
  
  private errorMessage: any;
  public profile;
  public battleTag: string;
  
  ngOnInit() {
    this.diabloApiService.init('US', 'pt_BR');
    // Battle Tag in name-#### format (ie. Noob-1234)
    // this.getProfile('Noob-1234');
  }
  
  getProfile(battleTag: string) {
    this.profile = null;
    this.diabloApiService.getCareerProfile(battleTag)
      .then(
        (res : Response | any) => {
          // If using a callback for a JSONP response
          // use this commented line instead of res.json()
          // let response = res;
          let response = res.json();
          console.log(response);
          this.profile = response;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }
}