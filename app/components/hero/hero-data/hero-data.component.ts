import { Component, Input } from '@angular/core';
import { DiabloService } from './../../../services/diablo.service';

@Component({
  selector: 'hero-data',
  templateUrl: '/app/components/hero/hero-data/hero-data.component.html'
})

export class HeroDataComponent {
  @Input()
  public hero;
  
  constructor(public diabloService: DiabloService) {}
}