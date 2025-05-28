export type PlanType = 'BASIC' | 'STANDARD' | 'PREMIUM';

export interface SubscriptionPlan {
  type: PlanType;
  name: string;
  monthlyCost: number;
}
