import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { config } from './../config/diablo-api.config';
import { ApiService } from './api.service';
import { battleTagValidator } from './../validators/battle-tag.validator';
import { LocaleService } from './locale.service';

@Injectable()
export class DiabloApiService extends ApiService {
  private baseUrl : string;
  private apikey : string;
  private localeService : LocaleService;
  
  constructor(protected http: Http) {
    super(http);
    this.localeService = new LocaleService();
    this.baseUrl = config.baseUrl;
    this.apikey = config.apikey;
  }
  
  public getCareerProfile(battleTag: string, locale: string) {
    battleTagValidator.validate(battleTag);
    
    if (locale)
      this.localeService.setLocale(locale);
    
    return this.get(`profile/${battleTag}/`, { locale: this.localeService.getLocale() });
  }
  
  public get(path: string, params: Object): Promise<any[]> {
    let defaultParams = {
      apikey: this.apikey
    };
    
    params = Object.assign(defaultParams, params);
    
    let apiUrl = `https://${this.localeService.getCountry()}.${this.baseUrl + path}`;
    
    return ApiService.prototype.get.call(this, apiUrl, params);
  }
}