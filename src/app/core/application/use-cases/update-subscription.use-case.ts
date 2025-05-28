import { SubscriptionPlan } from "../../domain/models/subscription-plan.model";
import { SubscriptionDomainService } from "../../domain/services/subscription-domain.service";
import { ISubscriptionRepository } from "../../interfaces/repositories/subscription-repository.interface";

export class UpdateSubscriptionUseCase {
  constructor(private repository: ISubscriptionRepository) {}

  execute(customerId: string, newPlan: SubscriptionPlan, isAnnual: boolean): void {
    const existing = this.repository.getByCustomerId(customerId);
    if (!existing) return;

    const amount = SubscriptionDomainService.calculatePayment(newPlan, isAnnual);
    existing.planType = newPlan.type;
    existing.isAnnual = isAnnual;
    existing.amountPaid = amount;

    this.repository.update(existing);
  }
}
