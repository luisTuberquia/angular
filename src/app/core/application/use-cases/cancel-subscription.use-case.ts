import { ISubscriptionRepository } from "../../interfaces/repositories/subscription-repository.interface";

export class CancelSubscriptionUseCase {
  constructor(private repository: ISubscriptionRepository) {}

  execute(customerId: string): void {
    this.repository.cancel(customerId);
  }
}
