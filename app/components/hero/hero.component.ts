import { Component, Input } from '@angular/core';
import { HeroService } from './../../services/hero.service';

@Component({
  selector: 'hero',
  templateUrl: '/app/components/hero/hero.component.html'
})
export class HeroComponent {
  @Input()
  public hero;
  
  constructor(public heroService: HeroService) {}
  
  select() {
    this.heroService.selectHero(this.hero);
  }
};