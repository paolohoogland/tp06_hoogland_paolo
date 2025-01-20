import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { Produit } from '../../../models/produits.model';
import { ProduitsState, LoadProduits, LoadFilteredProduits } from '../../store/produits/produits.state';
import { AjouterAuPanier } from '../../store/panier/panier.state';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-liste-produits',
  standalone: true,
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ListeProduitsComponent implements OnInit {
  produits$!: Observable<Produit[]>;
  searchQuery: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadAllProduits();
  }

  loadAllProduits(): void {
    this.produits$ = this.store.select(ProduitsState.getProduits);
    this.store.dispatch(new LoadProduits());
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.loadAllProduits(); 
    } else {
      this.produits$ = this.store.select(ProduitsState.getProduits);
      this.store.dispatch(new LoadFilteredProduits(this.searchQuery));
    }
  }

  onReset(): void {
    this.searchQuery = '';
    this.loadAllProduits();
  }

  ajouterAuPanier(produit: Produit) {
    this.store.dispatch(new AjouterAuPanier(produit));
  }
}
