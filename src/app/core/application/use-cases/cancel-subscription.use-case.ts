import { Inject, Injectable } from "@angular/core";
import { ISubscriptionDomainService } from "../../domain/services/ISubscriptionDomainService";
import { ISubscriptionRepository } from "../../interfaces/repositories/ISubscriptionRepository";
import { SUBSCRIPTION_REPOSITORY, SUBSCRIPTION_DOMAIN_SERVICE } from "../../infrastructure/repositories/repository-tokens"; // ajusta path según tu proyecto
import { ICancelSubscriptionUseCase } from "../Ports/ICancelSubscriptionUseCase";


@Injectable()
export class CancelSubscriptionUseCase implements ICancelSubscriptionUseCase{

    constructor(
      @Inject(SUBSCRIPTION_REPOSITORY) private repository: ISubscriptionRepository,
      @Inject(SUBSCRIPTION_DOMAIN_SERVICE) private subscriptionService: ISubscriptionDomainService
    ) {}

  execute(customerId: string): boolean {
    const sub = this.repository.getByCustomerId(customerId);

    if (!sub || sub.status !== 'ACTIVE') return false;

    const refundEligible = this.subscriptionService.canBeCancelled(sub.startDate);
    this.repository.cancel(customerId);
    return refundEligible;
  }
}
