import { PlanType } from "./plan-type.enum";

export interface SubscriptionPlan {
  type: PlanType;
  name: string;
  monthlyCost: number;
}
