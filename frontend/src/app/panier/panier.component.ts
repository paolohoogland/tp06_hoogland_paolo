import { Component } from '@angular/core';
import { Produit_panier } from '../models/produit_panier';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { PanierState } from '../states/panier.state';
import { Observable } from 'rxjs';
import { RemoveProduit, SetProduitQtt } from '../actions/panier-action';

@Component({
    selector: 'app-panier',
    imports: [CommonModule],
    templateUrl: './panier.component.html',
    styleUrl: './panier.component.css'
})
export class PanierComponent {
  panier$: Observable<Produit_panier[]>;
  nbProduits$: Observable<number>;
  total$: Observable<number>;

  constructor(private store: Store) {
    this.panier$ = this.store.select(PanierState.getPanier);
    this.nbProduits$ = this.store.select(PanierState.getNbProduits);
    this.total$ = this.store.select(PanierState.getTotal);
   }

  onRemoveFromCart(product: Produit_panier) {
    this.store.dispatch(new RemoveProduit(product));
  }

  onSetQuantity(product: Produit_panier, quantity: string) {
    const pr_panier = new Produit_panier();
    pr_panier.product = product.product;
    pr_panier.price = product.price;
    pr_panier.unit = product.unit;
    pr_panier.quantity = parseInt(quantity);
    pr_panier.description = product.description;

    this.store.dispatch(new SetProduitQtt(pr_panier));
  }
}