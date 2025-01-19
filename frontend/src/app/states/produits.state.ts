import { Injectable } from '@angular/core';
import {
    Action,
    Selector,
    State,
    StateContext,
} from '@ngxs/store';
import { ProduitStateModel } from './produits-state-model';
import { AddProduit, UpdateFilter } from '../actions/produits-action';

@State<ProduitStateModel>({
    name: 'produits',
    defaults: {
        produits: [],
        produits_filtre: []
    },
})
@Injectable()
export class ProduitState {

    @Selector()
    static getProduits(state: ProduitStateModel) {
        return state.produits;
    }

    @Selector()
    static getProduits_filtre(state: ProduitStateModel) {
        return state.produits_filtre;
    }

    @Selector()
    static getAllCategories(state: ProduitStateModel) {
        let categories = new Set<string>();
        state.produits.forEach(product => {
            product.categories.forEach(category => categories.add(category));
        });
        return Array.from(categories);
    }

    @Action(UpdateFilter)
    updateFilter({ getState, patchState }: StateContext<ProduitStateModel>, { payload }: any) {
        const state = getState();
        let produits_filtre = state.produits;
        
        produits_filtre = produits_filtre.filter(product => {
            if (payload.category != null && payload.category != "All" && !product.categories.includes(payload.category)) {
                return false;
            }
            if (payload.name != null && payload.name != "" && !product.product.toLowerCase().includes(payload.name.toLowerCase())) {
                return false;
            }
            return true;
        });

        patchState({ produits_filtre });
    }

    @Action(AddProduit)
    add({ getState, patchState }: StateContext<ProduitStateModel>, { payload }: AddProduit) {
        const state = getState();
        const produits = [...state.produits];
        produits.push(payload);
        //update the produits_filtre
        let produits_filtre = state.produits;
        patchState({ produits, produits_filtre });
    }
}