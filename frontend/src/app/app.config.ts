import { provideHttpClient } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store'; 
import { ApplicationConfig, importProvidersFrom } from '@angular/core'; 
import { ProduitsState } from './store/produits/produits.state'; 
import { PanierState } from './store/panier/panier.state'; 
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProduitService } from './produit.service';

export const appConfig : ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    ProduitService,
    importProvidersFrom(NgxsModule.forRoot([ProduitsState, PanierState]))
  ]
};
