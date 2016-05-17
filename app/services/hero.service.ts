import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/subject';

@Injectable()
export class HeroService {
  private heroSelectedSource = new Subject<Object>();
  
  public heroSelected$ = this.heroSelectedSource.asObservable();
  
  selectHero(hero: Object) {
    this.heroSelectedSource.next(hero);
  }
}