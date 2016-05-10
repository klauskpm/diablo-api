import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class ApiService {
  constructor(protected http: Http) {
    this.http = http;
  }
  
  public get(url: string, params: Object): Promise<any[]> {
    return this.http.get(`${url + this.prepareQueryString(params)}`)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
  }
  
  private prepareQueryString(params: Object) : string {
    var paramsIndex;
    var arrayParams = [];
    
    for (paramsIndex in params) {
      if (params.hasOwnProperty(paramsIndex))
        arrayParams.push(`${paramsIndex}=${params[paramsIndex]}`);
    }
    
    return `?${arrayParams.join('&')}`;
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