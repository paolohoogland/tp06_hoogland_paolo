import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Produit } from '../../../models/produits.model';    
import { Injectable, Inject } from '@angular/core';
import { ProduitService } from '../../produit.service';
import { tap } from 'rxjs/operators';

export class LoadProduits {
  static readonly type = '[Produit] Load Produits';
}

export class LoadFilteredProduits {
  static readonly type = '[Produit] Load Filtered Produits';
  constructor(public searchTerm: string) {}
}

export interface ProduitStateModel {
  produits: Produit[];
}

@State<ProduitStateModel>({
  name: 'produits',
  defaults: {
    produits: []
  }
})
@Injectable()
export class ProduitsState {
  constructor(private produitService: ProduitService) {}

  @Selector()
  static getProduits(state: ProduitStateModel) {
    return state.produits;
  }

  @Action(LoadProduits)
  loadProduits(ctx: StateContext<ProduitStateModel>) {
    return this.produitService.getProduits().pipe(
      tap((produits) => {
        ctx.patchState({ produits });
      })
    );
  }

  @Action(LoadFilteredProduits)
  loadFilteredProduits(ctx: StateContext<ProduitStateModel>, action: LoadFilteredProduits) {
    return this.produitService.getFilteredProduits(action.searchTerm).pipe(
      tap((produits) => {
        ctx.patchState({ produits });
      })
    );
  }
}
