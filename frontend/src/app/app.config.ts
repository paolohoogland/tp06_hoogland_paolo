// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { ApiService } from './api.service';
// import { NgxsModule } from '@ngxs/store';
// import { PanierState } from './states/panier.state';
// import { ProduitState } from './states/produits.state';
// import { UserState } from './states/user.state';
// import { AuthInterceptor } from './auth/auth.interceptor';
// import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//     providers: [
//         provideRouter(routes),
//         provideHttpClient(),
//         ApiService,
//         importProvidersFrom(NgxsModule.forRoot([PanierState, ProduitState, UserState])),
//         provideHttpClient(withInterceptorsFromDi()),
//         {
//             provide: HTTP_INTERCEPTORS,
//             useClass: AuthInterceptor,
//             multi: true,
//         },
//     ]
// };

import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store'; 
import { ApplicationConfig, importProvidersFrom } from '@angular/core'; 
import { ProduitsState } from './store/produits/produits.state'; 
import { PanierState } from './store/panier/panier.state'; 
import { AuthService } from './auth.service';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProduitService } from './produit.service';
import { AuthServiceInterceptor } from './auth.interceptor';


export const appConfig : ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ProduitService,
    AuthService,
    importProvidersFrom(NgxsModule.forRoot([ProduitsState, PanierState])),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthServiceInterceptor, multi: true },
  ]
};
