import { Component, Inject, OnInit } from '@angular/core';
import { SubscriptionPlan } from '../../core/domain/models/subscription-plan.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanType } from '../../core/domain/models/plan-type.enum';
import { RouterModule } from '@angular/router';
import { CANCEL_SUBSCRIPTION_USE_CASE, SUBSCRIBE_USE_CASE, UPDATE_SUBSCRIPTION_USE_CASE,SUBSCRIPTION_REPOSITORY } from '../../core/infrastructure/repositories/repository-tokens';
import { ISubscriptionRepository } from '../../core/interfaces/repositories/ISubscriptionRepository';
import { ISubscribeUseCase } from '../../core/application/Ports/ISubscribeUseCase';
import { IUpdateSubscriptionUseCase } from '../../core/application/Ports/IUpdateSubscriptionUseCase';
import { ICancelSubscriptionUseCase } from '../../core/application/Ports/ICancelSubscriptionUseCase';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  customerId = '';
  selectedPlan: PlanType = PlanType.BASIC;
  isAnnual = false;
  allSubscriptions: any[] = [];
  currentSubscription: any = null;
  refundMessage = '';

  readonly plans: SubscriptionPlan[] = [
    { type: PlanType.BASIC, name: 'Básico', monthlyCost: 10 },
    { type: PlanType.STANDARD, name: 'Estándar', monthlyCost: 20 },
    { type: PlanType.PREMIUM, name: 'Premium', monthlyCost: 30 }
  ];

  constructor(
    @Inject(SUBSCRIBE_USE_CASE) private subscribeUseCase: ISubscribeUseCase,
    @Inject(UPDATE_SUBSCRIPTION_USE_CASE) private updateUseCase: IUpdateSubscriptionUseCase,
    @Inject(CANCEL_SUBSCRIPTION_USE_CASE) private cancelUseCase: ICancelSubscriptionUseCase,
    @Inject(SUBSCRIPTION_REPOSITORY) private subscriptionRepository: ISubscriptionRepository
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  subscribe(): void {
    const plan = this.plans.find(p => p.type === this.selectedPlan)!;
    this.customerId = this.subscribeUseCase.execute(plan, this.isAnnual);
    this.loadAll();
    this.customerId = '';
  }

  update(): void {
    const plan = this.plans.find(p => p.type === this.selectedPlan)!;
    this.updateUseCase.execute(this.customerId, plan, this.isAnnual);
    this.currentSubscription = this.subscriptionRepository.getByCustomerId(this.customerId);
    this.loadAll();
  }

  cancel(): void {
    const refundApplied = this.cancelUseCase.execute(this.customerId);
    this.refundMessage = refundApplied
      ? '¡Reembolso parcial aplicado!'
      : 'Cancelación realizada sin reembolso.';
    this.loadAll();
  }

  loadAll(): void {
  this.allSubscriptions = this.subscriptionRepository.getAll();
  this.currentSubscription = this.subscriptionRepository.getByCustomerId(this.customerId);
}
}
