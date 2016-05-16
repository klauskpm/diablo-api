import { Injectable, Inject } from '@angular/core';
import { Http, Jsonp } from '@angular/http';

import { config } from './../config/diablo-api.config';
import { ApiService } from './api.service';
import { battleTagValidator } from './../validators/battle-tag.validator';
import { heroIdValidator } from './../validators/hero-id.validator';
import { LocaleService } from './locale.service';
import { RouterService } from './router.service';

@Injectable()
export class DiabloApiService extends ApiService {
  private baseUrl : string;
  private apikey : string;
  private localeService : LocaleService;
  private router : RouterService;
  
  constructor(protected http: Http, protected jsonp: Jsonp) {
    super(http, jsonp);
    this.localeService = new LocaleService();
    this.baseUrl = config.baseUrl;
    this.apikey = config.apikey;
    this.router = new RouterService();
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
   * Returns the career profile
   * 
   * Based on the BattleTag and the region(ie. US) it returns the career
   * profile 
   * 
   * @param {String} battleTag Battle Tag in name-#### format (ie. Noob-1234)
   * @param {String=} locale What locale to use in the response (ie. en_US)
   * @param {String=} callback Request data to be returned as a JsonP callback
   * 
   * @return {Promise}
   */
  public getCareerProfile(battleTag: string, locale?: string, callback?: string) {
    battleTagValidator.validate(battleTag);
    
    let url = this.router.get('CareerProfile', [{"battleTag": battleTag}]);
    
    return this.request(url, locale, callback);
  }
  
  /**
   * Returns the hero profile
   * 
   * Based on the BattleTag, Hero ID and the region(ie. US) it returns the
   * hero profile 
   * 
   * @param {String} battleTag Battle Tag in name-#### format (ie. Noob-1234)
   * @param {Number} heroId The hero id of the hero to look up
   * @param {String=} locale What locale to use in the response (ie. en_US)
   * @param {String=} callback Request data to be returned as a JsonP callback
   * 
   * @return {Promise}
   */
  public getHeroProfile(battleTag: string, heroId: number, locale?: string, callback?: string) {
    battleTagValidator.validate(battleTag);
    heroIdValidator.validate(heroId);
    
    let url = this.router.get('HeroProfile', [{
      "battleTag": battleTag,
      "id": heroId
    }]);
    
    return this.request(url, locale, callback);
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
  
  /**
   * Sends a GET request expecting a JSONP data response
   * 
   * @param {String} path
   * @param {Object} params
   * 
   * return {Promise}
   */
  public getJsonp(path: string, params: Object) : Promise<any[]> {
    let prepared = this.prepareRequest(path, params);
    
    return ApiService.prototype.getJsonp.call(this, prepared.apiUrl, prepared.params);
  }
  
  /**
   * Prepare the URL and the params to be sent
   * 
   * Concat the URL with the region/country identifier, the base URL and the
   * route path to follow.
   * Merge the params to be sent with the api key.
   * 
   * @param {String} path Route path for the request
   * @param {Object} params Params to be merge with apiKey
   * 
   * return {{params: Object, apiUrl: String}}
   */
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
  
  /**
   * Sends a get or getJSONP request
   * 
   * Settup the locale and callback params, and if the callback is setted it
   * will make a getJSONP request, if else a get request.
   * 
   * return {Promise}
   */
  private request(url: string, locale: string, callback? : string) {
    if (locale) {
      this.localeService.setLocale(locale);
    }
    
    let params: {locale: string, callback?: string} = {
      locale: this.localeService.getLocale()
    };
    
    if (callback) {
      params.callback = callback;
      return this.getJsonp(url, params);
    } else {
      return this.get(url, params);
    }
  }
}