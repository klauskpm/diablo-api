import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { config } from './../config/diablo-api.config';

import { ApiService } from './api.service';

import { battleTagValidator } from './../validators/battle-tag.validator';

@Injectable()
export class DiabloApiService extends ApiService {
  private baseUrl : string;
  private apikey : string;
  
  constructor(protected http: Http) {
    super(http);
    this.baseUrl = config.baseUrl;
    this.apikey = config.apikey;
  }
  
  public getCareerProfile(battleTag: string, locale: string = 'en_US') {
    battleTagValidator.validate(battleTag);
    
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