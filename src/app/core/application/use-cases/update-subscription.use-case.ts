import { SubscriptionPlan } from "../../domain/models/subscription-plan.model";
import { SubscriptionDomainService } from "../../domain/services/subscription-domain.service";
import { ISubscriptionRepository } from "../../interfaces/repositories/subscription-repository.interface";

export class UpdateSubscriptionUseCase {
  constructor(private repository: ISubscriptionRepository) {}

  execute(customerId: string, plan: SubscriptionPlan, isAnnual: boolean): void {
    const sub = this.repository.getByCustomerId(customerId);
    if (!sub || sub.status !== 'ACTIVE') return;
    sub.nextPlanType = plan.type;
    sub.nextIsAnnual = isAnnual;
    this.repository.update(sub);
  }
}
