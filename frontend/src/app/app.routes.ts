import { Routes } from '@angular/router';
import { BoutiqueComponent } from './boutique/boutique.component';
import { PanierComponent } from './panier/panier.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
    { path: 'boutique', component: BoutiqueComponent },
    { path: 'panier', component: PanierComponent },
    { path: 'account', component: AccountComponent },
    { path: '**', component: BoutiqueComponent },
];
