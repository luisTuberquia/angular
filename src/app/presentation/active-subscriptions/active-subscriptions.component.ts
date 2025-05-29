import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageSubscriptionRepository } from '../../core/infrastructure/repositories/local-storage-subscription.repository';

@Component({
  standalone: true,
  selector: 'app-active-subscriptions',
  imports: [CommonModule, RouterModule],
  templateUrl: './active-subscriptions.component.html',
  styleUrls: ['./active-subscriptions.component.css']
})
export class ActiveSubscriptionsComponent {
  private repository = new LocalStorageSubscriptionRepository();

  private _activeSubscriptions = signal(this.repository.getAll().filter(s => s.status === 'ACTIVE'));
  private _currentPage = signal(1);
  readonly itemsPerPage = 5;

  get activeSubscriptions() {
    return this._activeSubscriptions();
  }

  get currentPage() {
    return this._currentPage();
  }

  get totalPages() {
    return Math.ceil(this.activeSubscriptions.length / this.itemsPerPage);
  }

  get paginatedSubscriptions() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.activeSubscriptions.slice(start, start + this.itemsPerPage);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this._currentPage.set(page);
    }
  }
}
