import { SubscriptionPlan } from "../models/subscription-plan.model";

export class SubscriptionDomainService {
  static calculatePayment(plan: SubscriptionPlan, isAnnual: boolean): number {
    return isAnnual ? plan.monthlyCost * 12 * 0.9 : plan.monthlyCost;
  }
}

