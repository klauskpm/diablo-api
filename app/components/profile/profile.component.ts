import { Component, Input } from '@angular/core';
import { HeroComponent } from './../hero/hero.component';

@Component({
  selector: 'profile',
  templateUrl: '/app/components/profile/profile.component.html',
  directives: [HeroComponent]
})
export class ProfileComponent {
  @Input()
  public profile;
};