import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PanierState } from '../../store/panier/panier.state';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterModule, CommonModule]
})
export class HeaderComponent implements OnInit {
  nbProduits$!: Observable<number>;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    this.nbProduits$ = this.store.select(PanierState.getNbProduits);

    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
