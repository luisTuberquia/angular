import { SubscriptionPlan } from "../../domain/models/subscription-plan.model";
import { ISubscriptionRepository } from "../../interfaces/repositories/ISubscriptionRepository";
import { SUBSCRIPTION_REPOSITORY, SUBSCRIPTION_DOMAIN_SERVICE, UPDATE_SUBSCRIPTION_USE_CASE } from "../../infrastructure/repositories/repository-tokens"; // ajusta path según tu proyecto
import { Inject, Injectable } from "@angular/core";
import { IUpdateSubscriptionUseCase } from "../../application/Ports/IUpdateSubscriptionUseCase";


@Injectable()
export class UpdateSubscriptionUseCase  implements IUpdateSubscriptionUseCase{
constructor(
      @Inject(SUBSCRIPTION_REPOSITORY) private repository: ISubscriptionRepository,
      @Inject(SUBSCRIPTION_DOMAIN_SERVICE) private UpdatesubscriptionService: IUpdateSubscriptionUseCase
    ) {}

  execute(customerId: string, plan: SubscriptionPlan, isAnnual: boolean): void {
    const sub = this.repository.getByCustomerId(customerId);
    if (!sub || sub.status !== 'ACTIVE') return;
    sub.nextPlanType = plan.type;
    sub.nextIsAnnual = isAnnual;
    this.repository.update(sub);
  }
}

