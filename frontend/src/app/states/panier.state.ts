import { Injectable } from '@angular/core';
import {
    Action,
    Selector,
    State,
    StateContext,
} from '@ngxs/store';
import { PanierStateModel } from './panier-state-model';
import { AddProduit, RemoveProduit, SetProduitQtt, ClearPanier } from '../actions/panier-action';

@State<PanierStateModel>({
    name: 'panier',
    defaults: {
        panier: [],
    },
})
@Injectable()
export class PanierState {
    @Selector()
    static getPanier(state: PanierStateModel) {
        return state.panier;
    }

    @Selector()
    static getTotal(state: PanierStateModel) {
        return state.panier.reduce((total, produit) => total + produit.price * produit.quantity, 0);
    }

    @Selector()
    static getNbProduits(state: PanierStateModel) {
        return state.panier.reduce((count, produit) => count + produit.quantity, 0);
    }

    @Action(AddProduit)
    add({ getState, patchState }: StateContext<PanierStateModel>, { payload }: AddProduit) {
        const state = getState();
        const panier = [...state.panier];
        const existingProduit = panier.find(p => p.product === payload.product);

        if (existingProduit) {
            existingProduit.quantity += payload.quantity;
        } else {
            panier.push(payload);
        }

        patchState({ panier });
    }

    @Action(SetProduitQtt)
    setQuantity({ getState, patchState }: StateContext<PanierStateModel>, { payload }: SetProduitQtt) {
        const state = getState();
        const panier = [...state.panier];
        const existingProduit = panier.find(p => p.product === payload.product);

        if (existingProduit) {
            if (payload.quantity <= 0) {
                // Remove the product if quantity is zero or less
                patchState({ panier: panier.filter(p => p.product !== payload.product) });
            } else {
                existingProduit.quantity = payload.quantity;
                patchState({ panier });
            }
        }
    }

    @Action(RemoveProduit)
    remove({ getState, patchState }: StateContext<PanierStateModel>, { payload }: RemoveProduit) {
        const state = getState();
        const panier = state.panier.filter(p => p.product !== payload.product);
        patchState({ panier });
    }

    @Action(ClearPanier)
    clear({ patchState }: StateContext<PanierStateModel>) {
        patchState({ panier: [] });
    }
}