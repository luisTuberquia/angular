import { SubscriptionPlan } from '../../domain/models/subscription-plan.model';

export interface ISubscribeUseCase {
  execute(plan: SubscriptionPlan, isAnnual: boolean): string;
}
