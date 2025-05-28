import { Component, OnInit } from '@angular/core';
import { SubscriptionPlan } from '../../core/domain/models/subscription-plan.model';
import { LocalStorageSubscriptionRepository } from '../../core/infrastructure/repositories/local-storage-subscription.repository';
import { SubscribeUseCase } from '../../core/application/use-cases/subscribe.use-case';
import { CancelSubscriptionUseCase } from '../../core/application/use-cases/cancel-subscription.use-case';
import { UpdateSubscriptionUseCase } from '../../core/application/use-cases/update-subscription.use-case';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanType } from '../../core/domain/models/plan-type.enum';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  private repository = new LocalStorageSubscriptionRepository();

  ngOnInit(): void {
    this.loadAll();
  }

  subscribe(): void {
    const plan = this.plans.find(p => p.type === this.selectedPlan)!;
    const useCase = new SubscribeUseCase(this.repository);
    // devuelve el customerId generado
    this.customerId = useCase.execute(plan, this.isAnnual);
    this.loadAll();
  }

  update(): void {
    const plan = this.plans.find(p => p.type === this.selectedPlan)!;
    new UpdateSubscriptionUseCase(this.repository)
      .execute(this.customerId, plan, this.isAnnual);
    this.loadAll();
  }

  cancel(): void {
    const refundApplied = new CancelSubscriptionUseCase(this.repository)
      .execute(this.customerId);
    this.refundMessage = refundApplied
      ? '¡Reembolso parcial aplicado!'
      : 'Cancelación realizada sin reembolso.';
    this.loadAll();
  }

  loadAll(): void {
    // carga la suscripción actual (puede ser null)
    this.currentSubscription = this.repository.getByCustomerId(this.customerId);
    // carga solo las activas
    this.allSubscriptions = this.repository
      .getAll()
      .filter(s => s.status === 'ACTIVE');
  }
}
