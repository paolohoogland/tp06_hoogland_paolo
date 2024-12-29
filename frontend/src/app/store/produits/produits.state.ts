import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Produit } from '../../../models/produits.model';    
import { Injectable } from '@angular/core';
import { ProduitService } from '../../produit.service';
import { tap } from 'rxjs/operators';

export class LoadProduits {
  static readonly type = '[Produit] Load Produits';
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
}
