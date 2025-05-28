import { Component } from '@angular/core';
import { SubscriptionComponent } from "./presentation/subscription/subscription.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SubscriptionComponent],
  template: `
    <app-subscription></app-subscription>
  `
})
export class AppComponent {}
