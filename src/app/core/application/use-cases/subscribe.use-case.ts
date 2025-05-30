import { SubscriptionPlan } from "../../domain/models/subscription-plan.model";
import { Subscription } from "../../domain/models/subscription.model";
import { ISubscriptionDomainService } from "../../domain/services/ISubscriptionDomainService";
import { SubscriptionDomainService } from "../../domain/services/subscription-domain.service";
import { SUBSCRIPTION_REPOSITORY, SUBSCRIPTION_DOMAIN_SERVICE } from "../../infrastructure/repositories/repository-tokens";
import { Inject, Injectable } from "@angular/core";
import { ISubscriptionRepository } from "../../interfaces/repositories/ISubscriptionRepository";
import { ISubscribeUseCase } from "../../application/Ports/ISubscribeUseCase";

@Injectable()
export class SubscribeUseCase implements ISubscribeUseCase
{constructor(
      @Inject(SUBSCRIPTION_REPOSITORY) private repository: ISubscriptionRepository,
      @Inject(SUBSCRIPTION_DOMAIN_SERVICE) private subscriptionService: ISubscriptionDomainService
    ) {console.log('subscriptionService:', subscriptionService);}

  execute(plan: SubscriptionPlan, isAnnual: boolean): string {
    const customerId = crypto.randomUUID();
    const calcPayment = this.subscriptionService.calculatePayment;
    console.log('calcPayment:', calcPayment);
    const amount = calcPayment.call(this.subscriptionService, plan, isAnnual);
    const subscription: Subscription = {
      customerId,
      planType: plan.type,
      startDate: new Date(),
      isAnnual,
      amountPaid: amount,
      status: 'ACTIVE'
    };
    this.repository.save(subscription);
    return customerId;
  }
}

