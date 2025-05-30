import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CANCEL_SUBSCRIPTION_USE_CASE, SUBSCRIBE_USE_CASE, SUBSCRIPTION_DOMAIN_SERVICE, SUBSCRIPTION_REPOSITORY, UPDATE_SUBSCRIPTION_USE_CASE } from './app/core/infrastructure/repositories/repository-tokens';
import { LocalStorageSubscriptionRepository } from './app/core/infrastructure/repositories/local-storage-subscription.repository';
import { SubscribeUseCase } from './app/core/application/use-cases/subscribe.use-case';
import { UpdateSubscriptionUseCase } from './app/core/application/use-cases/update-subscription.use-case';
import { CancelSubscriptionUseCase } from './app/core/application/use-cases/cancel-subscription.use-case';
import { SubscriptionDomainService } from './app/core/domain/services/subscription-domain.service';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: SUBSCRIPTION_REPOSITORY,
      useClass: LocalStorageSubscriptionRepository
    },
    {
      provide: SUBSCRIBE_USE_CASE,
      useClass: SubscribeUseCase
    },
    {
      provide: UPDATE_SUBSCRIPTION_USE_CASE,
      useClass: UpdateSubscriptionUseCase
    },
    {
      provide: CANCEL_SUBSCRIPTION_USE_CASE,
      useClass: CancelSubscriptionUseCase
    },
    {
      provide: SUBSCRIPTION_DOMAIN_SERVICE,
      useClass: SubscriptionDomainService
    }
  ]
}).catch(err => console.error(err));
