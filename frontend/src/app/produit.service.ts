import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produits.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private backendUrl = environment.backendProduct;

  constructor(private http: HttpClient) {}

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.backendUrl);
  }

  getFilteredProduits(searchTerm: string): Observable<Produit[]> {
    const url = `${this.backendUrl}?search=${encodeURIComponent(searchTerm)}`;
    return this.http.get<Produit[]>(url);
  }
}
