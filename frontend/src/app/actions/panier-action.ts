import { Produit_panier } from '../models/produit_panier';

export class AddProduit {
  static readonly type = '[Panier] Add Produit';
  constructor(public payload: Produit_panier) {}
}

export class RemoveProduit {
  static readonly type = '[Panier] Remove Produit';
  constructor(public payload: Produit_panier) {}
}

export class SetProduitQtt {
  static readonly type = '[Panier] Set Produit Quantity';
  constructor(public payload: Produit_panier) {}
}

export class ClearPanier {
  static readonly type = '[Panier] Clear';
}