import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produit } from '../models/produit';
import { Produit_panier } from '../models/produit_panier';
import { Store } from '@ngxs/store';
import { AddProduit } from '../actions/panier-action';
import { Observable } from 'rxjs';
import { ProduitState } from '../states/produits.state';

@Component({
    selector: 'app-product-list',
    imports: [CommonModule],
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products$: Observable<Produit[]>;

  constructor(private store: Store) { 
    this.products$ = this.store.select(ProduitState.getProduits_filtre);
  }

  onAddToCart(product: Produit, quantity: string) {
    const pr_panier = new Produit_panier();
    pr_panier.product = product.product;
    pr_panier.price = product.price;
    pr_panier.unit = product.unit;
    pr_panier.quantity = parseInt(quantity);

    pr_panier.description = product.description;

    this.store.dispatch(new AddProduit(pr_panier));
  }
}