import { Injectable } from '@angular/core';
import { locales } from './../mock-locale';
import { config } from './../config/diablo-api.config';
import { localeValidator } from './../validators/locale.validator';

export interface countryInterface {
  url: string,
  locales: Object
}

@Injectable()
export class LocaleService {
  private country : countryInterface;
  private locale : string;
  private locales;
  
  constructor() {
    this.locales = locales;
    this.country = this.locales[config.defaultCountry];
    this.locale = this.country.locales[config.defaultLocale];
  }
  
  public setLocale(locale: string) {
    if (!this.isLocaleValid(locale))
      throw `The ${locale} does not belongs to ${this.getCountry()}`;
      
    this.locale = this.country.locales[locale];
  }
  
  public getLocale() {
    return this.locale;
  }
  
  public setCountry(country: string) {
    if (!this.isCountryValid(country))
      throw `The country ${country} is invalid`;
      
    this.country = this.locales[country];
  }
  
  public getCountry() {
    return this.country.url;
  }
  
  private isLocaleValid(locale: string) {
    return !!this.country.locales[locale];
  }
  
  private isCountryValid(country: string) {
    return !!this.locales[country];
  }
}