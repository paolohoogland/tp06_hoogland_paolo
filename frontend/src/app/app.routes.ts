import { Routes } from '@angular/router';
import { ListeProduitsComponent } from './components/liste-produits/liste-produits.component';
import { PanierComponent } from './panier/panier.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'produits', component: ListeProduitsComponent },
    { path: 'panier', component: PanierComponent },
    { path : 'login', component: LoginComponent },
    { path : 'register', component: RegisterComponent },
    { path: '', redirectTo: 'produits', pathMatch: 'full' }
];
