import { Component, OnInit, Injectable } from '@angular/core';

import { Http, Response, HTTP_PROVIDERS } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

import { DiabloApiService } from './diablo/services/diablo-api.service';

@Component({
  selector: 'my-app',
  template: '<h1>Diablo API</h1>',
  providers: [
    HTTP_PROVIDERS,
    DiabloApiService
  ]
})
export class AppComponent implements OnInit {
  constructor(private diabloApiService: DiabloApiService) {}
  
  private errorMessage: any;
  
  ngOnInit() {
    // Battle Tag in name-#### format (ie. Noob-1234)
    // this.getProfile('Noob-1234');
  }
  
  getProfile(battleTag: string) {
    this.diabloApiService.getCareerProfile(battleTag)
                    .then(
                      res => {
                        console.log(res);
                      },
                      error =>  this.errorMessage = <any>error);
  }
}