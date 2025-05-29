import { Routes } from "@angular/router";
import { SubscriptionComponent } from "./presentation/subscription/subscription.component";
import { ActiveSubscriptionsComponent } from "./presentation/active-subscriptions/active-subscriptions.component";

export const routes: Routes = [
  { path: '', component: SubscriptionComponent },
  { path: 'subscriptions/active', component: ActiveSubscriptionsComponent },
];
