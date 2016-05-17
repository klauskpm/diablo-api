import { Component, Input } from '@angular/core';

@Component({
  selector: 'hero',
  templateUrl: '/app/components/hero/hero.component.html'
})
export class HeroComponent {
  @Input()
  public hero;
};