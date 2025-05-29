import { SubscriptionDomainService } from "../../domain/services/subscription-domain.service";
import { ISubscriptionRepository } from "../../interfaces/repositories/subscription-repository.interface";

export class CancelSubscriptionUseCase {
  constructor(private repository: ISubscriptionRepository) {}

  execute(customerId: string): boolean {
    const sub = this.repository.getByCustomerId(customerId);

    if (!sub || sub.status !== 'ACTIVE') return false;

    const refundEligible = SubscriptionDomainService.canBeCancelled(sub.startDate);
    this.repository.cancel(customerId);
    return refundEligible;
  }
}
