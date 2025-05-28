import { Component } from '@angular/core';
import { SubscriptionPlan } from '../../core/domain/models/subscription-plan.model';
import { LocalStorageSubscriptionRepository } from '../../core/infrastructure/repositories/local-storage-subscription.repository';
import { SubscribeUseCase } from '../../core/application/use-cases/subscribe.use-case';
import { CancelSubscriptionUseCase } from '../../core/application/use-cases/cancel-subscription.use-case';
import { UpdateSubscriptionUseCase } from '../../core/application/use-cases/update-subscription.use-case';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  customerId = '';
  selectedPlan: 'BASIC' | 'STANDARD' | 'PREMIUM' = 'BASIC';
  isAnnual = false;
  subscription: any = null;

  plans: SubscriptionPlan[] = [
    { type: 'BASIC', name: 'Básico', monthlyCost: 10 },
    { type: 'STANDARD', name: 'Estándar', monthlyCost: 20 },
    { type: 'PREMIUM', name: 'Premium', monthlyCost: 30 },
  ];

  private repository = new LocalStorageSubscriptionRepository();

  subscribe() {
    const plan = this.plans.find(p => p.type === this.selectedPlan)!;
    new SubscribeUseCase(this.repository).execute(this.customerId, plan, this.isAnnual);
    this.load();
  }

  cancel() {
    new CancelSubscriptionUseCase(this.repository).execute(this.customerId);
    this.load();
  }

  update() {
    const plan = this.plans.find(p => p.type === this.selectedPlan)!;
    new UpdateSubscriptionUseCase(this.repository).execute(this.customerId, plan, this.isAnnual);
    this.load();
  }

  load() {
    this.subscription = this.repository.getByCustomerId(this.customerId);
  }
}
