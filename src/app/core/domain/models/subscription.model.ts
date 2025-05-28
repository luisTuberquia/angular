import { PlanType } from "./plan-type.enum";

export interface Subscription {
  customerId: string;
  planType: PlanType;
  startDate: Date;
  isAnnual: boolean;
  amountPaid: number;
  status: 'ACTIVE' | 'CANCELLED';
  nextPlanType?: PlanType;
  nextIsAnnual?: boolean;
}
