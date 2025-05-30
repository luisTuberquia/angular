import { InjectionToken } from "@angular/core";
import { ISubscriptionDomainService } from "../../domain/services/ISubscriptionDomainService";
import { ISubscriptionRepository } from "../../interfaces/repositories/ISubscriptionRepository";
import { ISubscribeUseCase } from "../../application/Ports/ISubscribeUseCase";
import { IUpdateSubscriptionUseCase } from "../../application/Ports/IUpdateSubscriptionUseCase";
import { ICancelSubscriptionUseCase } from "../../application/Ports/ICancelSubscriptionUseCase";


export const SUBSCRIPTION_REPOSITORY = new InjectionToken<ISubscriptionRepository>('SubscriptionRepository');
export const SUBSCRIBE_USE_CASE = new InjectionToken<ISubscribeUseCase>('SubscribeUseCase');
export const UPDATE_SUBSCRIPTION_USE_CASE = new InjectionToken<IUpdateSubscriptionUseCase>('UpdateSubscriptionUseCase');
export const CANCEL_SUBSCRIPTION_USE_CASE = new InjectionToken<ICancelSubscriptionUseCase>('CancelSubscriptionUseCase');
export const SUBSCRIPTION_DOMAIN_SERVICE = new InjectionToken<ISubscriptionDomainService>('SubscriptionDomainService');


