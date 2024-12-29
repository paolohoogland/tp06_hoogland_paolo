import { Routes } from '@angular/router';
import { ListeProduitsComponent } from './components/liste-produits/liste-produits.component';
import { PanierComponent } from './panier/panier.component';

export const routes: Routes = [
    { path: 'produits', component: ListeProduitsComponent },
    { path: 'panier', component: PanierComponent },
    { path: '', redirectTo: 'produits', pathMatch: 'full' }
];
