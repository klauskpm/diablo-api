import { Component, Input } from '@angular/core';
import { HeroService } from './../../../services/hero.service';

@Component({
  selector: 'hero-data',
  templateUrl: '/app/components/hero/hero-data/hero-data.component.html'
})

export class HeroDataComponent {
  @Input()
  public hero;
  
  constructor(public heroService: HeroService) {}
}