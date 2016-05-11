import { Component, Input } from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: '/app/components/profile/profile.component.html'
})
export class ProfileComponent {
  @Input()
  public profile;
};