import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

import { config } from './../config/diablo-api.config';


@Injectable()
export class DiabloApiService {
  private baseUrl : string;
  private apikey : string;
  
  constructor(private http: Http) {
    this.baseUrl = config.baseUrl;
    this.apikey = config.apikey;
  }
  
  public getCareerProfile(battleTag: string, locale: string = 'en_US') {
    if (!battleTag)
      throw 'BattleTag must be defined.';
      
    if (typeof battleTag !== 'string')
      throw 'BattleTag must be a string';
      
    if (typeof locale !== 'string')
      throw 'Locale must be a string';
    
    return this.get(`${this.baseUrl}profile/${battleTag}/?locale=${locale}`);
  }
  
  private get(url: string): Promise<any[]> {
    url = this.applyApiKey(url);
    
    return this.http.get(url)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
  }
  
  private applyApiKey(url: string): string {
    if (url.indexOf(this.apikey) > -1)
      return url;
      
    return url += '&apikey=' + this.apikey;
  }
  
  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    
    let body = res.json();
    return body || { };
  }
  
  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}