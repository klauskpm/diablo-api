import { Injectable, Inject } from '@angular/core';
import { Http, Jsonp } from '@angular/http';

import { config } from './../config/diablo-api.config';
import { ApiService } from './api.service';
import { battleTagValidator } from './../validators/battle-tag.validator';
import { LocaleService } from './locale.service';

@Injectable()
export class DiabloApiService extends ApiService {
  private baseUrl : string;
  private apikey : string;
  private localeService : LocaleService;
  
  constructor(protected http: Http, protected jsonp: Jsonp) {
    super(http, jsonp);
    this.localeService = new LocaleService();
    this.baseUrl = config.baseUrl;
    this.apikey = config.apikey;
  }
  
  /**
   * Settup the country and the locale for future requests
   * 
   * @param {String} country A 2 letters uppercase country acronym (ie. US)
   * @param {String} locale What locale to use in future responses
   * (ie. pt_BR, en_US)
   */
  public init(country: string, locale: string) : void {
    this.localeService.setCountry(country);
    this.localeService.setLocale(locale);
  }
  
  /**
   * Returns the career profile of a Battle Tag
   * 
   * @param {String} battleTag Battle Tag in name-#### format (ie. Noob-1234)
   * @param {String=} locale What locale to use in the response (ie. en_US)
   * @param {String=} callback Request data to be returned as a JsonP callback
   * 
   * @return {Promise}
   */
  public getCareerProfile(battleTag: string, locale?: string, callback?: string) {
    let params : {locale: string, callback?: string} = {
      locale: this.localeService.getLocale()
    };
    
    battleTagValidator.validate(battleTag);
    let url = `profile/${battleTag}/`;
    
    if (locale) {
      this.localeService.setLocale(locale);
      params.locale = this.localeService.getLocale();
    }
    
    if (callback) {
      params.callback = callback;
      return this.getJsonp(url, params);
    } else {
      return this.get(url, params);
    }
  }
  
  /**
   * Sends a GET request
   * 
   * This is the default GET request that uses the country - setted in init -
   * and expects a path and the respective params to be given.
   * 
   * @param {String} path
   * @param {Object} params
   * 
   * return {Promise}
   */
  public get(path: string, params: Object) : Promise<any[]> {
    let prepared = this.prepareRequest(path, params);
    
    return ApiService.prototype.get.call(this, prepared.apiUrl, prepared.params);
  }
  
  public getJsonp(path: string, params: Object) : Promise<any[]> {
    let prepared = this.prepareRequest(path, params);
    
    return ApiService.prototype.getJsonp.call(this, prepared.apiUrl, prepared.params);
  }
  
  protected prepareRequest(path: string, params: Object) : {params: any, apiUrl: string} {
    let defaultParams = {
      apikey: this.apikey
    };
    
    params = Object.assign(defaultParams, params);
    
    let apiUrl = `https://${this.localeService.getCountry()}.${this.baseUrl + path}`;
    
    return {
      params: params,
      apiUrl: apiUrl
    };
  }
}