import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store'; 
import { ApplicationConfig, importProvidersFrom } from '@angular/core'; 
import { ProduitsState } from './store/produits/produits.state'; 
import { PanierState } from './store/panier/panier.state'; 
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProduitService } from './produit.service';
import { AuthServiceInterceptor } from './auth.interceptor';


export const appConfig : ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    ProduitService,
    importProvidersFrom(NgxsModule.forRoot([ProduitsState, PanierState])),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthServiceInterceptor, multi: true },
  ]
};
