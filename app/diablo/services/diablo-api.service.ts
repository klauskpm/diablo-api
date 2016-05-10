import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { config } from './../config/diablo-api.config';

import { ApiService } from './api.service';

@Injectable()
export class DiabloApiService extends ApiService {
  private baseUrl : string;
  private apikey : string;
  
  constructor(private http: Http) {
    super(http);
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
    
    return this.get(`profile/${battleTag}/`, { locale: locale });
  }
  
  public get(path: string, params: Object): Promise<any[]> {
    var defaultParams = {
      apikey: this.apikey
    };
    
    params = Object.assign(defaultParams, params);
    
    return ApiService.prototype.get.call(this, `${this.baseUrl + path}`, params);
  }
}