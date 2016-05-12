import { Component, OnInit, Injectable } from '@angular/core';

import { Http, Response, HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';

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
    JSONP_PROVIDERS,
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
          this.profile = res;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }
}