import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Carte {
  id: number;
  nomCarte: string;
  codeCarte: string;
  ccv: string;
  expiration: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarteService {
  private cartes = signal<Carte[]>([]);
  private idCounter = 1;

  getListeCarte() {
    return this.cartes;
  }

  addCarte(carte: Carte) { 
    const newCarte: Carte = { ...carte, id: this.idCounter++ }; // id auto-increment
    this.cartes.update((allCartes) => [...allCartes, newCarte]);
  }

  deleteCarte(id: number) {
    this.cartes.update((allCartes) => allCartes.filter((carte) => carte.id !== id));
  }
}
