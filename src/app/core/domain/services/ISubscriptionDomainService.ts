import { SubscriptionPlan } from '../models/subscription-plan.model';

export interface ISubscriptionDomainService {
  calculatePayment(plan: SubscriptionPlan, isAnnual: boolean): number;
  canBeCancelled(subscriptionDate: Date): boolean;
}
