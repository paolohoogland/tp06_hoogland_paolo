import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Produit } from '../../../models/produits.model';
import { ProduitsState, LoadProduits } from '../../store/produits/produits.state';
import { AjouterAuPanier } from '../../store/panier/panier.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-produits',
  standalone: true,
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css'],
  imports: [CommonModule]
})
export class ListeProduitsComponent implements OnInit {

  produits$!: Observable<Produit[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.produits$ = this.store.select(ProduitsState.getProduits);
    this.store.dispatch(new LoadProduits());
  }

  ajouterAuPanier(produit: Produit) {
    this.store.dispatch(new AjouterAuPanier(produit));
  }
}
