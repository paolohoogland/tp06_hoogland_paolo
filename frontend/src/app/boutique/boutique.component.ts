import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { Produit } from '../models/produit';
import { FilterComponent } from '../filter/filter.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { Store } from '@ngxs/store';
import { AddProduit } from '../actions/produits-action';

@Component({
    selector: 'app-boutique',
    imports: [CommonModule, FilterComponent, ProductListComponent],
    templateUrl: './boutique.component.html',
    styleUrls: ['./boutique.component.css']
})
export class BoutiqueComponent implements OnInit {
    constructor(private apiService: ApiService, private store: Store) { }

    ngOnInit() {
        this.apiService.getProduits().subscribe((products: Produit[]) => {
            products.forEach((product) => {
                this.store.dispatch(new AddProduit(product));
            });
        });
    }
}