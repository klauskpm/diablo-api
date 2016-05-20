import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/subject';

@Injectable()
export class DiabloService {
  private heroSelectedSource = new Subject<Object>();
  
  public heroSelected$ = this.heroSelectedSource.asObservable();
  public heroSelected : Object;
  
  selectHero(hero: Object) {
    this.heroSelected = hero;
    this.heroSelectedSource.next(hero);
  }
}