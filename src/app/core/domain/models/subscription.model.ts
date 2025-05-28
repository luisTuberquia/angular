import { PlanType } from "./subscription-plan.model";

export interface Subscription {
  customerId: string;
  planType: PlanType;
  startDate: Date;
  isAnnual: boolean;
  amountPaid: number;
  status: 'ACTIVE' | 'CANCELLED';
}
