import { Component, Input } from '@angular/core';
import { HeroService } from './../../services/hero.service';
import { HeroDataComponent } from './hero-data/hero-data.component';

@Component({
  selector: 'hero',
  templateUrl: '/app/components/hero/hero.component.html',
  directives: [HeroDataComponent]
})
export class HeroComponent {
  @Input()
  public hero;
  
  constructor(public heroService: HeroService) {}
  
  select() {
    this.heroService.selectHero(this.hero);
  }
};