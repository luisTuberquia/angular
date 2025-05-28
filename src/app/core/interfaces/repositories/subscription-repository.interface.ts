import { Subscription } from "../../domain/models/subscription.model";

export interface ISubscriptionRepository {
  save(subscription: Subscription): void;
  getByCustomerId(customerId: string): Subscription | null;
  update(subscription: Subscription): void;
  cancel(customerId: string): void;
}
