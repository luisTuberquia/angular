import { SubscriptionPlan } from "../../domain/models/subscription-plan.model";

export interface IUpdateSubscriptionUseCase {
  execute(customerId: string, plan: SubscriptionPlan, isAnnual: boolean): void;
}
