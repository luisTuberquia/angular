import { Injectable } from "@angular/core";
import { SubscriptionPlan } from "../models/subscription-plan.model";
import { ISubscriptionDomainService } from "./ISubscriptionDomainService";

@Injectable({
  providedIn: 'root' // o sin este campo si lo provees explícitamente
})
export class SubscriptionDomainService implements ISubscriptionDomainService {
  calculatePayment(plan: SubscriptionPlan, isAnnual: boolean): number {
    return isAnnual ? plan.monthlyCost * 12 * 0.9 : plan.monthlyCost;
  }

  canBeCancelled(subscriptionDate: Date): boolean {
    const now = new Date();
    const diff = (now.getTime() - new Date(subscriptionDate).getTime()) / (1000 * 3600 * 24);
    return diff < 15;
  }
}

