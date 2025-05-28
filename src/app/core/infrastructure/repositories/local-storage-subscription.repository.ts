import { ISubscriptionRepository } from "../../interfaces/repositories/subscription-repository.interface";
import { Subscription } from "../../domain/models/subscription.model";

export class LocalStorageSubscriptionRepository implements ISubscriptionRepository {
  private key = 'subscriptions';

  getAll(): Subscription[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  private saveAll(subs: Subscription[]): void {
    localStorage.setItem(this.key, JSON.stringify(subs));
  }

  save(subscription: Subscription): void {
    const subs = this.getAll().filter(s => s.customerId !== subscription.customerId);
    subs.push(subscription);
    this.saveAll(subs);
  }

  getByCustomerId(customerId: string): Subscription | null {
    return this.getAll().find(s => s.customerId === customerId) || null;
  }

  update(subscription: Subscription): void {
    this.save(subscription);
  }

  cancel(customerId: string): void {
    const subs = this.getAll();
    const index = subs.findIndex(s => s.customerId === customerId);
    if (index >= 0) {
      subs[index].status = 'CANCELLED';
      this.saveAll(subs);
    }
  }
}
