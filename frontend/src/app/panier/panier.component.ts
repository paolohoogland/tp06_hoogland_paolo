import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Produit } from '../../models/produits.model';
import { PanierState, RetirerDuPanier } from '../store/panier/panier.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  standalone: true,
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
  imports: [CommonModule]
})
export class PanierComponent implements OnInit {
  panier$!: Observable<Produit[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.panier$ = this.store.select(PanierState.getProduits);
  }

  retirerDuPanier(produitId: string) {
    this.store.dispatch(new RetirerDuPanier(produitId));
  }

  hasItems(panier: any[] | null): boolean {
    return panier !== null && panier.length > 0;
  }
}
