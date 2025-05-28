import { SubscriptionPlan } from "../models/subscription-plan.model";

export class SubscriptionDomainService {
  static calculatePayment(plan: SubscriptionPlan, isAnnual: boolean): number {
    return isAnnual ? plan.monthlyCost * 12 * 0.9 : plan.monthlyCost;
  }

  static canBeCancelled(subscriptionDate: Date): boolean {
    const now = new Date();
    const diff = (now.getTime() - new Date(subscriptionDate).getTime()) / (1000 * 3600 * 24);
    return diff < 15;
  }
}

