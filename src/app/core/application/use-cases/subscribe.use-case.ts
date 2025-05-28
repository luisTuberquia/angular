import { SubscriptionPlan } from "../../domain/models/subscription-plan.model";
import { Subscription } from "../../domain/models/subscription.model";
import { SubscriptionDomainService } from "../../domain/services/subscription-domain.service";
import { ISubscriptionRepository } from "../../interfaces/repositories/subscription-repository.interface";

export class SubscribeUseCase {
  constructor(private repository: ISubscriptionRepository) {}

  execute(customerId: string, plan: SubscriptionPlan, isAnnual: boolean): void {
    const amount = SubscriptionDomainService.calculatePayment(plan, isAnnual);
    const subscription: Subscription = {
      customerId,
      planType: plan.type,
      startDate: new Date(),
      isAnnual,
      amountPaid: amount,
      status: 'ACTIVE'
    };

    this.repository.save(subscription);
  }
}
