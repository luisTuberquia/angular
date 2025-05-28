import { ISubscriptionRepository } from "../../interfaces/repositories/subscription-repository.interface";
import { Subscription } from "../../domain/models/subscription.model";

export class LocalStorageSubscriptionRepository implements ISubscriptionRepository {
  private key = 'subscriptions';

  private getAll(): Subscription[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  private saveAll(subs: Subscription[]) {
    localStorage.setItem(this.key, JSON.stringify(subs));
  }

  save(subscription: Subscription): void {
    const all = this.getAll().filter(s => s.customerId !== subscription.customerId);
    all.push(subscription);
    this.saveAll(all);
  }

  getByCustomerId(customerId: string): Subscription | null {
    return this.getAll().find(s => s.customerId === customerId) || null;
  }

  update(subscription: Subscription): void {
    this.save(subscription);
  }

  cancel(customerId: string): void {
    const all = this.getAll();
    const index = all.findIndex(s => s.customerId === customerId);
    if (index !== -1) {
      all[index].status = 'CANCELLED';
      this.saveAll(all);
    }
  }
}
