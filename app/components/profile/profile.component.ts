import { Component, Input } from '@angular/core';
import { HeroComponent } from './../hero/hero.component';
import { HeroService } from './../../services/hero.service';

@Component({
  selector: 'profile',
  templateUrl: '/app/components/profile/profile.component.html',
  directives: [HeroComponent],
  providers: [HeroService]
})
export class ProfileComponent {
  @Input()
  public profile;
  
  constructor(private heroService: HeroService) {
    this.heroService.heroSelected$.subscribe(
      hero => {
        console.log(hero);
      }
    )
  }
};