import { Component, Input } from '@angular/core';
import { HeroComponent } from './../hero/hero.component';
import { DiabloService } from './../../services/diablo.service';

@Component({
  selector: 'profile',
  templateUrl: '/app/components/profile/profile.component.html',
  directives: [HeroComponent],
  providers: [DiabloService]
})
export class ProfileComponent {
  @Input()
  public profile;
  
  constructor(private diabloService: DiabloService) {
    this.diabloService.heroSelected$.subscribe(
      hero => {
        console.log(hero);
      }
    )
  }
};