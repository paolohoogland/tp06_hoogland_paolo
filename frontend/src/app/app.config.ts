import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ApiService } from './api.service';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from './states/panier.state';
import { ProduitState } from './states/produits.state';
import { UserState } from './states/user.state';
import { AuthInterceptor } from './auth/auth.interceptor';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        ApiService,
        importProvidersFrom(NgxsModule.forRoot([PanierState, ProduitState, UserState])),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ]
};