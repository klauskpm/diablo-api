import { Component, Input } from '@angular/core';
import { DiabloService } from './../../services/diablo.service';
import { HeroDataComponent } from './hero-data/hero-data.component';

@Component({
  selector: 'hero',
  templateUrl: '/app/components/hero/hero.component.html',
  directives: [HeroDataComponent]
})
export class HeroComponent {
  @Input()
  public hero;
  
  constructor(public diabloService: DiabloService) {}
  
  select() {
    this.diabloService.selectHero(this.hero);
  }
};