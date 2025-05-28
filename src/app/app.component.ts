import { Component } from '@angular/core';
import { SubscriptionComponent } from "./presentation/subscription/subscription.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, SubscriptionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'satrack-subscriptions';
}
