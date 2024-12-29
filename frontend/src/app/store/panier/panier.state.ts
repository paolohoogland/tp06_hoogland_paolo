import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Produit } from '../../../models/produits.model';

export class AjouterAuPanier {
  static readonly type = '[Panier] Ajouter Produit';
  constructor(public payload: Produit) {}
}

export class RetirerDuPanier {
  static readonly type = '[Panier] Retirer Produit';
  constructor(public produitId: string) {}
}

export interface PanierStateModel {
  panier: Produit[];
}

@State<PanierStateModel>({
  name: 'panier',  
  defaults: {
    panier: []  
  }
})
@Injectable()
export class PanierState { 

  @Selector()
  static getProduits(state: PanierStateModel) { 
    return state.panier;
  }

  @Selector()
  static getNbProduits(state: PanierStateModel) {  
    return state.panier.length;
  }

  @Action(AjouterAuPanier)
  ajouterAuPanier(ctx: StateContext<PanierStateModel>, action: AjouterAuPanier) {  
    const state = ctx.getState();
    const newProduct = { ...action.payload, id: this.generateUniqueId() };
    ctx.setState({
      ...state,
      panier: [...state.panier, newProduct]  
    });
  }

  @Action(RetirerDuPanier)
  retirerDuPanier(ctx: StateContext<PanierStateModel>, action: RetirerDuPanier) {  
    const state = ctx.getState();
    ctx.setState({
      ...state,
      panier: state.panier.filter(produit => produit.id !== action.produitId)
    });
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
