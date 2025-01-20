// import { Routes } from '@angular/router';
// import { BoutiqueComponent } from './boutique/boutique.component';
// import { PanierComponent } from './panier/panier.component';
// import { AccountComponent } from './account/account.component';

// export const routes: Routes = [
//     { path: 'boutique', component: BoutiqueComponent },
//     { path: 'panier', component: PanierComponent },
//     { path: 'account', component: AccountComponent },
//     { path: '**', component: BoutiqueComponent },
// ];

import { Routes } from '@angular/router';
import { ListeProduitsComponent } from './components/liste-produits/liste-produits.component';
import { PanierComponent } from './panier/panier.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
    { path : 'produits', component: ListeProduitsComponent },
    { path : 'panier', component: PanierComponent },
    { path : 'login', component: LoginComponent },
    { path : 'register', component: RegisterComponent },
    { path : 'account', component: AccountComponent },
    { path: '', redirectTo: 'produits', pathMatch: 'full' }
];
