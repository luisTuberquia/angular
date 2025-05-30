export interface ICancelSubscriptionUseCase {
  execute(customerId: string): boolean;
}
